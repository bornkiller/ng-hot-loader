/**
 * @description - ng-hot-loader route possible
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
import path from 'path';
import { camelCase } from 'lodash';

import { analyzeTemplateRef, analyzeControllerReg } from './route.parse';
import { produceRouteTransferStation, produceHotRoute } from './route.engine';

export function transformHotRoute(input, resourcePath) {
  let templateRefs = analyzeTemplateRef(input);
  let controllerRefs = analyzeControllerReg(input);
  let critical = [...templateRefs, ...controllerRefs];
  let routeTransferStation = produceRouteTransferStation(critical);
  let routeHotAccept = produceHotRoute(critical);
  let routeFileName = camelCase(path.basename(resourcePath, '.route.js')) + 'Route';
  let routeDeclareName = routeFileName.charAt(0).toUpperCase() + routeFileName.slice(1);

  return `${input}
    if (module.hot) {
      let flatRouteDefinition;
      let routeTransferStation;
      let pickRouteHotName;
    
      flatRouteDefinition = ${routeDeclareName}.reduce((prev, route) => {
        let result = [];
    
        angular.forEach(route.views, (config, property) => {
          result.push({
            hotModuleName: route.name + '_' + property + '_template',
            template: config.template
          });
    
          if (config.controller) {
            result.push({
              hotModuleName: route.name + '_' + property + '_controller',
              controller: config.controller
            });
          }
        });
    
        return [...prev, ...result];
      }, []);
    
      routeTransferStation = [
        ${routeTransferStation}
      ];
    
      routeTransferStation = routeTransferStation.map(route => {
        let matchRouteDefinition = flatRouteDefinition.find(flatRoute => {
          return flatRoute.hotModuleName.endsWith('template') ? route.template == flatRoute.template : route.controller == flatRoute.controller;
        });
    
        route.hotModuleName = matchRouteDefinition.hotModuleName;
    
        return route;
      });
    
      pickRouteHotName = function (location) {
        return routeTransferStation.find(route => route.location == location).hotModuleName;
      };
      
      ${routeHotAccept}
    }
  `;
}