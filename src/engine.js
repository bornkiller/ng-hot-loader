/**
 * @description - generate HMR code here
 */
'use strict';

const { capitalize } = require('lodash');

module.exports = {
  translateImportType,
  translateModuleDescriptor,
  translateRouteDescriptor
};

/**
 * @description - consist import type
 * @param {NgHotDescriptor} descriptor
 */
function translateImportType(descriptor) {
  return descriptor.type === 'destruct'
    ? `let {${descriptor.name}} = require('${descriptor.location}');`
    : `let ${descriptor.name} = require('${descriptor.location}');`;
}

/**
 * @description - feature module HMR code
 * @param {NgHotDescriptor} descriptor
 */
function translateModuleDescriptor(descriptor) {
  return `
   if (module.hot) {
     module.hot.accept(['${descriptor.location}'], function () {
       ${translateImportType(descriptor)}
       $hmr.hmrOnChange('${capitalize(descriptor.category)}', '${descriptor.token}', ${descriptor.name});
       $hmr.hmrDoActive('${capitalize(descriptor.category)}', '${descriptor.token}', ${descriptor.name});
     });
   }`;
}

/**
 * @description - feature module HMR code
 * @param {NgHotDescriptor} descriptor
 */
function translateRouteDescriptor(descriptor) {
  if (descriptor.type === 'template') {
    return `
      if (module.hot) {
        module.hot.accept(['${descriptor.location}'], function() {
          $hmr.hmrOnChange('RouteTemplate', require('${descriptor.location}'));
          $hmr.hmrDoActive('RouteTemplate', require('${descriptor.location}'));
        });
      };
    `;
  } else {
    return `
      if (module.hot) {
       module.hot.accept(['${descriptor.location}'], function () {
         ${translateImportType(descriptor)}
         $hmr.hmrOnChange('RouteController', ${descriptor.name});
         $hmr.hmrDoActive('RouteController', ${descriptor.name});
        });
      }`;
  }
}