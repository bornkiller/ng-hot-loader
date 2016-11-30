/**
 * @description - ng-hot-loader
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

const {
  analyzeInstanceReference,
  analyzeTemplateReference,
  analyzeAccessToken,
  resolveAnalyzeStream
} = require('ng-hot-analyzer');

const { combineCrucialMarkup } = require('./src/markup');
const { translateModuleDescriptor, translateRouteDescriptor, translateModalDescriptor } = require('./src/engine');

module.exports = function (input) {
  this.cacheable && this.cacheable();

  let workingDirectory = process.cwd();
  let resourcePath = this.resourcePath;
  // generate HMR markup
  let result = combineCrucialMarkup(workingDirectory, resourcePath, input);
  let list;
  let HMRCode;

  switch (true) {
    case resourcePath.endsWith('.module.js'):
      list = resolveAnalyzeStream(analyzeInstanceReference(result), analyzeAccessToken(result));
      HMRCode = list.map(descriptor => translateModuleDescriptor(descriptor)).join('\n');
      break;
    case resourcePath.endsWith('.route.js'):
      list = [...analyzeInstanceReference(result), ...analyzeTemplateReference(result)];
      list = list.filter(ref => ref.type === 'template' || ref.name.includes('Controller'));
      HMRCode = list.map(descriptor => translateRouteDescriptor(descriptor)).join('\n');
      break;
    case resourcePath.endsWith('.controller.js'):
      list = [...analyzeInstanceReference(result), ...analyzeTemplateReference(result)];
      list = list.filter(ref => ref.type === 'template' || ref.name.includes('ModalController'));
      HMRCode = list.map(descriptor => translateModalDescriptor(descriptor)).join('\n');
      break;
  }

  HMRCode && (result = `${result}\n${HMRCode}`);

  // 此处只需要返回字符串变量即可,无需再次手动转义
  if (this.callback) {
    this.callback(null, result);
  } else {
    return result;
  }
};