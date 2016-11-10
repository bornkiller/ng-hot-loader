/**
 * @description - ng-hot-loader filter / service possible
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

/* eslint-disable no-cond-assign */

// 匹配过滤器路径不带引号
const filterCaptureReg = /import\s+\{\s+(\w+Filter)\s+\}\s+from\s+\'([^']+)\'/gm;
// 匹配工厂函数路径不带引号
const factoryCaptureReg = /import\s+\{\s+(\w+Factory)\s+\}\s+from\s+\'([^']+)\'/gm;

import { ensureInstanceToken } from './module.util';

/**
 * @description - 分析模块声明中过滤器引用
 *
 * @param {string} template
 * @param {string} prefix
 *
 * @returns {Array}
 *
 * @example
 * import { postfixFilter } from './filter/postfix.filter';
 */
export function analyzeFilterRef(template, prefix) {
  let middleware;
  let ngHotFilter = [];

  while (middleware = filterCaptureReg.exec(template)) {
    ngHotFilter.push({
      location: middleware[2],
      name: middleware[1],
      access_token : ensureInstanceToken(middleware[1], prefix),
      type: 'filter'
    });
  }

  return ngHotFilter;
}

/**
 * @description - 分析路由声明中控制器
 *
 * @param {string} template
 * @param {string} prefix
 *
 * @returns {Array}
 *
 * @example
 * import { SidebarController } from './flow/sidebar.controller
 */
export function analyzeFactoryReg(template, prefix) {
  let middleware;
  let ngHotFactory = [];

  while (middleware = factoryCaptureReg.exec(template)) {
    ngHotFactory.push({
      location: middleware[2],
      name: middleware[1],
      access_token : ensureInstanceToken(middleware[1], prefix),
      type: 'factory'
    });
  }

  return ngHotFactory;
}