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
  it('inline html template', function () {
    let workingDirectory = process.cwd();
    let resourcePath = path.resolve(__dirname, 'fixture', 'template', 'love.html');
    let input = fs.readFileSync(resourcePath, options);
    let keywords = `<!-- @ng_hmr_identity test-fixture-template-love-html -->`;
    let result = transformInlineTemplate(input, resourcePath, workingDirectory);

    result.includes(keywords).should.be.true();
  });

  it('inline html template', function () {
    let workingDirectory = process.cwd();
    let resourcePath = path.resolve(__dirname, 'fixture', 'controller', 'collection.controller.js');
    let input = fs.readFileSync(resourcePath, options);
    let keywords = `CollectionController.ng_hmr_identity = 'test-fixture-controller-collection-controller-js'`;
    let result = transformInlineController(input, resourcePath, workingDirectory);

    result.includes(keywords).should.be.true();
  });
});