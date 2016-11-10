/**
 * @description - 基于模块声明分析生成过滤器,服务工厂函数热替换代码
 * @param list
 * @returns {string}
 */
export function produceHotFeatureModule(list) {
  let featureModuleHotAccept = list.map(descriptor => {
    if (descriptor.type == 'filter') {
      return `
        module.hot.accept(['${descriptor.location}'], function() {
          let element = angular.element(document.body);
          let $injector = element.injector();
          let $hmr = $injector.get('$hmr');
          let { ${descriptor.name} } = require('${descriptor.location}');
      
          $hmr.through('${descriptor.access_token}', $injector.invoke(${descriptor.name}));
        });
      `;
    } else {
      return `
        module.hot.accept(['${descriptor.location}'], function () {
          let element = angular.element(document.body);
          let $injector = element.injector();
          let $hmr = $injector.get('$hmr');
          let { ${descriptor.name} } = require('${descriptor.location}');
      
          $hmr.override('${descriptor.access_token}', $injector.invoke(${descriptor.name}));
        });  
      `;
    }
  });

  return featureModuleHotAccept.join('\n');
}