/**
 * @description - ng-hot-loader
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const { transformInlineTemplate, transformInlineController } = require('./src/inline');

module.exports = function (input) {
  this.cacheable && this.cacheable();

  let resourcePath = this.resourcePath;
  let workingDirectory = process.cwd();
  let result;

  switch (true) {
    case resourcePath.endsWith('.html'):
      result = transformInlineTemplate(input, resourcePath, workingDirectory);
      break;
    case resourcePath.endsWith(('.controller.js')):
      result = transformInlineController(input, resourcePath, workingDirectory);
      break;
    default:
      result = input;
  }

  // 此处只需要返回字符串变量即可,无需再次手动转义
  if (this.callback) {
    this.callback(null, result);
  } else {
    return result;
  }
};