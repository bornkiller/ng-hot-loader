/**
 * @description - test inline sub-module
 */
'use strict';

const fs = require('fs');
const path = require('path');
// eslint-disable-next-line
const should = require('should');

const { transformInlineTemplate, transformInlineController } = require('../src/inline');
const options = {encoding: 'utf8'};

describe('ng-hot-loader inline', function () {
  it('inline html markup', function () {
    let workingDirectory = process.cwd();
    let resourcePath = path.resolve(__dirname, 'fixture', 'template', 'love.html');
    let input = fs.readFileSync(resourcePath, options);
    let markup = `<!-- @ng_hmr_identity test-fixture-template-love-html -->`;

    transformInlineTemplate(workingDirectory, resourcePath, input).should.equal(markup);
  });

  it('inline controller markup', function () {
    let workingDirectory = process.cwd();
    let resourcePath = path.resolve(__dirname, 'fixture', 'controller', 'love.controller.js');
    let input = fs.readFileSync(resourcePath, options);
    let markup = `LoveController.ng_hmr_identity = 'test-fixture-controller-love-controller-js'`;

    transformInlineController(workingDirectory, resourcePath, input).should.equal(markup);
  });
});