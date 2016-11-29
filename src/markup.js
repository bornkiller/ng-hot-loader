/**
 * @description - add markup into html and controller declare
 */
'use strict';

const { transformInlineTemplate, transformInlineController } = require('./inline');

module.exports = {
  combineCrucialMarkup
};

function combineCrucialMarkup(workingDirectory, resourcePath, input) {
  let result;

  switch (true) {
    case resourcePath.endsWith('.html'):
      result = `${input}\n${transformInlineTemplate(workingDirectory, resourcePath, input)}`;
      break;
    case resourcePath.endsWith(('.controller.js')):
      result = `${input}\n${transformInlineController(workingDirectory, resourcePath, input)}`;
      break;
    default:
      result = input;
  }

  return result;
}
