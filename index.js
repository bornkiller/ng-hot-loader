/**
 * @description - ng-hot-loader
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import path from 'path';
import util from 'loader-utils';
import { camelCase, capitalize } from 'lodash';

import hotRouteAcceptor from './hot/route';
import hotFactoryAcceptor from './hot/factory';
import hotModalAcceptor from './hot/modal';

export default function (input) {
  this.cacheable && this.cacheable();
  
  const query = util.parseQuery(this.query);
  const resourcePath = this.resourcePath;
  const basename = path.basename(resourcePath);
  
  let result;
  
  switch (true) {
    case basename.endsWith('route.js'):
      result = hotRouteAcceptor(input, resourcePath);
      break;
    case basename.endsWith('factory.js'):
      result = hotFactoryAcceptor(input, resourcePath, query);
      break;
    case basename.endsWith('modal.html'):
      result = hotModalAcceptor(input, resourcePath);
      break;
    default:
      result = input;
  }
  
  // 此处只需要返回字符串变量即可,无需再次手动转义
  if (this.callback) {
    this.callback(null, result)
  } else {
    return result;
  }
};