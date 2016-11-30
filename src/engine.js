/**
 * @description - generate HMR code here
 */
'use strict';

const { capitalize } = require('lodash');

module.exports = {
  translateImportType,
  translateModuleDescriptor,
  translateRouteDescriptor,
  translateModalDescriptor
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

/**
 * @description
 * - feature modal HMR code
 * - maybe problem here, while controller import modal template and model controller, and something weired
 * @param {NgHotDescriptor} descriptor
 */
function translateModalDescriptor(descriptor) {
  if (descriptor.type === 'template') {
    return `
      if (module.hot) {
        module.hot.accept(['${descriptor.location}'], function() {
          $hmr.hmrOnChange('ModalTemplate', require('${descriptor.location}'));
          $hmr.hmrDoActive('ModalTemplate', require('${descriptor.location}'));
        });
      };
    `;
  } else {
    return `
      if (module.hot) {
       module.hot.accept(['${descriptor.location}'], function () {
         ${translateImportType(descriptor)}
         $hmr.hmrOnChange('ModalController', ${descriptor.name});
         $hmr.hmrDoActive('ModalController', ${descriptor.name});
        });
      }`;
  }
}