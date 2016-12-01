/**
 * @description - test engine sub-module
 */
'use strict';

// eslint-disable-next-line
const should = require('should');

const { translateHotDescriptor } = require('../src/engine');

const instance = {
  name: 'promptFactory',
  location: './service/prompt.factory',
  category: 'Factory',
  token: 'bkPrompt'
};

describe('ng-hot-loader engine', function () {
  it('should translate different import type', function () {
    let destructInstance = Object.assign({}, instance, { type: 'destruct' });
    let defaultInstance = Object.assign({}, instance, { type: 'default' });
    let normalizeReg = /(?:\n|\s)/g;
    let destructExpectation = `
      if (module.hot) {
        module.hot.accept(['./service/prompt.factory'], function () {
          let {promptFactory} = require('./service/prompt.factory');
          $hmr.hmrOnChange('Factory', 'bkPrompt', promptFactory);
          $hmr.hmrDoActive('Factory', 'bkPrompt', promptFactory);
        });
      };`;
    let defaultExpectation = `
      if (module.hot) {
        module.hot.accept(['./service/prompt.factory'], function () {
          let promptFactory = require('./service/prompt.factory');
          $hmr.hmrOnChange('Factory', 'bkPrompt', promptFactory);
          $hmr.hmrDoActive('Factory', 'bkPrompt', promptFactory);
        });
      };`;

    let destructCode = translateHotDescriptor(destructInstance);
    let defaultCode = translateHotDescriptor(defaultInstance);

    destructCode.replace(normalizeReg, '').should.equal(destructExpectation.replace(normalizeReg, ''));
    defaultCode.replace(normalizeReg, '').should.equal(defaultExpectation.replace(normalizeReg, ''));
  });
});