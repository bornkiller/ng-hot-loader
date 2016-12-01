/**
 * @description - generate HMR code here
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { template } = require('lodash');

// 编译基准母版
const benchmark = fs.readFileSync(path.resolve(__dirname, 'translate.template.ejs'), {encoding: 'utf8'});

module.exports = {
  translateHotDescriptor
};

/**
 * @description - translate NgHotDescriptor into HMR code
 * @param {NgHotDescriptor} descriptor
 */
function translateHotDescriptor(descriptor) {
  return template(benchmark)(descriptor);
}
