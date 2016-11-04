/**
 * @description - parse *.route.js, and generate necessary HMR code
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

/**
 * @description - 基于路由声明分析生成模板热替换代码
 * @param list
 * @returns {string}
 */
export function produceRouteTransferStation(list) {
  let routeTransferStation = list.map(descriptor => {
    if (descriptor.type == 'template') {
      return `{location: '${descriptor.location}', template: require('${descriptor.location}')}`;
    } else {
      return `{location: '${descriptor.location}', controller: require('${descriptor.location}').${descriptor.name}}`;
    }
  });

  return routeTransferStation.join(',\n');
}

/**
 * @description - 基于路由声明分析生成控制器热替换代码
 * @param list
 * @returns {string}
 */
export function produceHotRoute(list) {
  let routeHotAccept = list.map(descriptor => {
    if (descriptor.type == 'template') {
      return `
        module.hot.accept(['${descriptor.location}'], function () {
          let element = angular.element(document.body);
          let $injector = element.injector();
          let $hmr = $injector.get('$hmr');
          let targetModuleName = pickRouteHotName('${descriptor.location}');
          let template = require('${descriptor.location}');
      
          $hmr.notify(targetModuleName, template);
        });
      `;
    } else {
      return `
        module.hot.accept(['${descriptor.location}'], function () {
          let element = angular.element(document.body);
          let $injector = element.injector();
          let $hmr = $injector.get('$hmr');
          let targetModuleName = pickRouteHotName('${descriptor.location}');
          let SidebarController = require('${descriptor.location}').${descriptor.name};
    
          $hmr.notify(targetModuleName, SidebarController);
        });  
      `;
    }
  });

  return routeHotAccept.join('\n');
}