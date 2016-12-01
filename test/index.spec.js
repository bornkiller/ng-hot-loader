/**
 * @description - ng-hot-loader, how to write loader unit test ???
 */
'use strict';

const fs = require('fs');
const path = require('path');
// eslint-disable-next-line
const should = require('should');

const ngHotLoader = require('../');
const options = {encoding: 'utf8'};

describe.only('ng-hot-loader', function () {
  it('skip none support code', function () {
    let target = path.resolve(__dirname, 'fixture', 'template', 'love.html');
    let template = fs.readFileSync(target, options);
    let result = Reflect.apply(ngHotLoader, {resourcePath: target}, [template]);

    result.includes('<!-- @ng_hmr_identity test-fixture-template-love-html -->').should.be.true();
    result.includes('module.hot.accept').should.be.false();
  });

  it('decorate module HMR code', function () {
    let target = path.resolve(__dirname, 'fixture', 'share.module.js');
    let template = fs.readFileSync(target, options);
    let result = Reflect.apply(ngHotLoader, {resourcePath: target}, [template]);
    
    result.includes('module.hot.accept').should.be.true();
  });
});