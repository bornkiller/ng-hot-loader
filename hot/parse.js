/**
 * @description - parse *.route.js, and generate necessary HMR code
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

// 匹配HTML路径自带引号,为保持统一且正则表达式简化,后续处理
const templateCaptureReg = /template:\s+require\(([^\(\)]+)\)/gm;
// 匹配控制器路径不带引号
const controllerCaptureReg = /import\s+\{\s+(\w+Controller)\s+\}\s+from\s+\'([^']+)\'/gm;
// 匹配 modal 模板引用路径,临时性方案处理,后续需要进一步树立
const modalTemplateCaptureReg = /template\:\s+require\((['"])(.+modal\.html)\1\)/g;

/**
 * @description - 分析路由声明中模板
 * @param {string} template
 * @returns {Array}
 *
 * @example
 * template: require('./flow/core.html')
 */
export function analyzeTemplateRef(template) {
  let middleware;
  let ngHotTemplate = [];
  let quote = /(['"])/g;
  
  while (middleware = templateCaptureReg.exec(template)) {
    ngHotTemplate.push({
      location: middleware[1].replace(quote, ''),
      type: 'template'
    });
  }
  
  return ngHotTemplate;
}

/**
 * @description - 分析控制器中声明中modal模板
 * @param {string} template
 * @returns {Array}
 *
 * @example
 * template: require('./flow/hmr.modal.html')
 */
export function analyzeModalTemplateRef(template) {
  let middleware;
  let ngHotModalTemplate = [];
  
  while (middleware = modalTemplateCaptureReg.exec(template)) {
    ngHotModalTemplate.push({
      location: middleware[2],
      type: 'template'
    });
  }
  
  return ngHotModalTemplate;
}

/**
 * @description - 基于路由声明分析生成控制器热替换代码
 * @param list
 * @returns {string}
 */
export function fireModalHotAccept(list) {
  let modalHotAccept = list.map(descriptor => {
    return `
      module.hot.accept(['${descriptor.location}'], function () {
        let element = angular.element(document.body);
        let $injector = element.injector();
        let $hmr = $injector.get('$hmr');
        let template = require('${descriptor.location}');

        $hmr.update(template);
      });
    `;
  });
  
  return modalHotAccept.join('\n');
}

/**
 * @description - 分析路由声明中控制器
 * @param {string} template
 * @returns {Array}
 *
 * @example
 * import { SidebarController } from './flow/sidebar.controller
 */
export function analyzeControllerReg(template) {
  let middleware;
  let ngHotController = [];
  
  while (middleware = controllerCaptureReg.exec(template)) {
    ngHotController.push({
      location: middleware[2],
      name: middleware[1],
      type: 'controller'
    });
  }
  
  return ngHotController;
}

/**
 * @description - 基于路由声明分析生成模板热替换代码
 * @param list
 * @returns {string}
 */
export function fireRouteTransferStation(list) {
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
export function fireRouteHotAccept(list) {
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
      `
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