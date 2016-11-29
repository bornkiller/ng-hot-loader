/**
 * @description - generate HMR code here
 */
'use strict';

const { capitalize } = require('lodash');

module.exports = {
  translateImportType,
  translateHotDescriptor
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
 * @description - feature module HMR code, the descriptor not involve template category
 * @param {NgHotDescriptor} descriptor
 */
function translateHotDescriptor(descriptor) {
  return `
   if (module.hot) {
     module.hot.accept(['${descriptor.location}'], function () {
       ${translateImportType(descriptor)}
       $hmr.hmrOnChange('${capitalize(descriptor.category)}', '${descriptor.token}', ${descriptor.name});
       $hmr.hmrDoActive('${capitalize(descriptor.category)}', '${descriptor.token}', ${descriptor.name});
     });
   }`;
}