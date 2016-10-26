/**
 * @description - ng-hot-loader
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import path from 'path';

module.exports = function (source) {
  this.cacheable && this.cacheable();

  return source;
};