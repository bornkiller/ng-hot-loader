/**
 * @description - generate markup about html template or controller
 */
'use strict';

const path = require('path');
const { analyzeExportInstance } = require('ng-hot-analyzer');

module.exports = {
  transformInlineTemplate,
  transformInlineController
};

/**
 * @description - add markup into html template
 *
 * @param {string} resourcePath
 * @param {string} workingDirectory
 *
 * @return {string}
 */
function transformInlineTemplate(workingDirectory, resourcePath) {
  let identity = path.relative(workingDirectory, resourcePath).replace(/(\/|\.)/g, '-').toLowerCase();

  return `<!-- @ng_hmr_identity ${identity} -->`;
}

/**
 * @description - add markup into controller template
 *
 * @param {string} workingDirectory
 * @param {string} resourcePath
 * @param {string} input
 *
 * @return {string}
 */
function transformInlineController(workingDirectory, resourcePath, input) {
  let identity = path.relative(workingDirectory, resourcePath).replace(/(\/|\.)/g, '-').toLowerCase();
  let declare = analyzeExportInstance(input);

  return `${declare}.ng_hmr_identity = '${identity}'`;
}
