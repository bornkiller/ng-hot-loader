/**
 * @description - ng-hot-loader route possible
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

/**
 * @description - 基于路由声明分析生成控制器热替换代码
 * @param list
 * @returns {string}
 */
export function produceHotModal(list) {
  return list.map(descriptor => {
    if (descriptor.type == 'template') {
      return `
        module.hot.accept(['${descriptor.location}'], function () {
          let element = angular.element(document.body);
          let $injector = element.injector();
          let $hmr = $injector.get('$hmr');
          let template = require('${descriptor.location}');
  
          $hmr.update(template, 'template');
        });
      `;
    } else {
      return `
        module.hot.accept(['${descriptor.location}'], function () {
          let element = angular.element(document.body);
          let $injector = element.injector();
          let $hmr = $injector.get('$hmr');
          let controller = require('${descriptor.location}').${descriptor.name};
    
          $hmr.update(controller, 'controller');
        });
      `;
    }
  }).join('\n');
}