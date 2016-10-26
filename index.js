/**
 * @description - ng-hot-loader
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import path from 'path';
import util from 'loader-utils';
import { camelCase, capitalize } from 'lodash';

module.exports = function (input) {
  this.cacheable && this.cacheable();

  const query = util.parseQuery(this.query);

  const prefix = query.prefix;
  const basename = path.basename(this.resourcePath, '.factory.js');
  const targetName = !!prefix ? prefix + capitalize(camelCase(basename)) : camelCase(basename);
  const targetFactory = camelCase(basename) + 'Factory';

  return `${input}
    if (module.hot) {
      module.hot.accept();
  
      var element = angular.element(document.body);
      var $injector = element.injector();
  
      if ($injector) {
        var prevTargetService = $injector.get('${targetName}');
        var hotTargetService = $injector.invoke(${targetFactory});
        var $rootScope = $injector.get('$rootScope');
        
        angular.extend(prevTargetService, hotTargetService);
        $rootScope.$apply();
      }
    }
  `;
};