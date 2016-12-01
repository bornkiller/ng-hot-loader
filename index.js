/**
 * @description - ng-hot-loader
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const {
  analyzeInstanceReference,
  analyzeAccessToken,
  resolveAnalyzeStream
} = require('ng-hot-analyzer');

const { combineCrucialMarkup } = require('./src/markup');
const { translateHotDescriptor } = require('./src/engine');

module.exports = function (input) {
  this.cacheable && this.cacheable();

  let workingDirectory = process.cwd();
  let resourcePath = this.resourcePath;
  // generate HMR markup
  let result = combineCrucialMarkup(workingDirectory, resourcePath, input);
  let list;
  let HMRCode;
  
  // maybe some issue occur here, make sure descriptor match structure definition
  if (resourcePath.endsWith('.module.js')) {
    list = resolveAnalyzeStream(analyzeInstanceReference(result), analyzeAccessToken(result));
    HMRCode = list.map(descriptor => translateHotDescriptor(descriptor)).join('\n');
  }
  
  HMRCode && (result = `${result}\n${HMRCode}`);

  // 此处只需要返回字符串变量即可,无需再次手动转义
  if (this.callback) {
    this.callback(null, result);
  } else {
    return result;
  }
};