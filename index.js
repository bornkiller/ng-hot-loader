/**
 * @description - ng-hot-loader
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import path from 'path';
import util from 'loader-utils';

import { transformHotRoute } from './src/route/hmr.route';
import { transformHotModule } from './src/module/hmr.module';
import { transformModalTemplate, transformModalController, transformHotModal } from './src/modal/hmr.modal';

export default function (input) {
  this.cacheable && this.cacheable();

  const query = util.parseQuery(this.query);
  const resourcePath = this.resourcePath;
  const basename = path.basename(resourcePath);

  let result;

  switch (true) {
    case basename.endsWith('route.js'):
      result = transformHotRoute(input, resourcePath);
      break;
    case basename.endsWith('module.js'):
      result = transformHotModule(input, query);
      break;
    case basename.endsWith('modal.html'):
      result = transformModalTemplate(input, resourcePath);
      break;
    case basename.endsWith('modal.controller.js'):
      result = transformModalController(input, resourcePath);
      break;
    // $uibModal always occur into *.controller.js
    case basename.endsWith('controller.js'):
      result = transformHotModal(input);
      break;
    default:
      result = input;
  }

  // 此处只需要返回字符串变量即可,无需再次手动转义
  if (this.callback) {
    this.callback(null, result);
  } else {
    return result;
  }
}