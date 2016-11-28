/**
 * @description - add markup into html template or controller
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
 * @param {string} input
 * @param {string} resourcePath
 * @param {string} workingDirectory
 *
 * @return {string}
 */
function transformInlineTemplate(input, resourcePath, workingDirectory) {
  let identity = path.relative(workingDirectory, resourcePath).replace(/(\/|\.)/g, '-').toLowerCase();
  let hmrTemplateMark = `<!-- @ng_hmr_identity ${identity} -->`;

  return `${hmrTemplateMark} \n ${input}`;
}

/**
 * @description - add markup into controller template
 *
 * @param {string} input
 * @param {string} resourcePath
 * @param {string} workingDirectory
 *
 * @return {string}
 */
function transformInlineController(input, resourcePath, workingDirectory) {
  let identity = path.relative(workingDirectory, resourcePath).replace(/(\/|\.)/g, '-').toLowerCase();
  let declare = analyzeExportInstance(input);
  let hmrControllerMark = `${declare}.ng_hmr_identity = '${identity}'`;

  return `${input}\n${hmrControllerMark}`;
}
