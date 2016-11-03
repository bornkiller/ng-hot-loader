/**
 * @description - ng-hot-loader route possible
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import path from 'path';
import { camelCase } from 'lodash';

export function transformHotFactory(input, resourcePath, query) {
  const prefix = query.prefix;
  const basename = camelCase(path.basename(resourcePath, '.factory.js'));
  const factoryRegisterName = !!prefix ? prefix + basename.charAt(0).toUpperCase() + basename.slice(1) : basename;
  const factoryDeclareName = factoryRegisterName + 'Factory';

  return `${input}
    if (module.hot) {
      module.hot.accept();
  
      var element = angular.element(document.body);
      var $injector = element.injector();
  
      if ($injector) {
        var prevTargetService = $injector.get('${factoryRegisterName}');
        var hotTargetService = $injector.invoke(${factoryDeclareName});
        var $rootScope = $injector.get('$rootScope');
        
        angular.extend(prevTargetService, hotTargetService);
        $rootScope.$apply();
      }
    }
  `;
}