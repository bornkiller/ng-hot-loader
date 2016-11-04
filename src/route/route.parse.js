/**
 * @description - ng-hot-loader route possible
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

/* eslint-disable no-cond-assign */

// 匹配HTML路径自带引号,为保持统一且正则表达式简化,后续处理
const templateCaptureReg = /template:\s+require\(([^\(\)]+)\)/gm;
// 匹配控制器路径不带引号
const controllerCaptureReg = /import\s+\{\s+(\w+Controller)\s+\}\s+from\s+\'([^']+)\'/gm;

/**
 * @description - 分析路由声明中模板
 * @param {string} template
 * @returns {Array}
 *
 * @example
 * template: require('./flow/core.html')
 */
export function analyzeTemplateRef(template) {
  let middleware;
  let ngHotTemplate = [];
  let quote = /(['"])/g;

  while (middleware = templateCaptureReg.exec(template)) {
    ngHotTemplate.push({
      location: middleware[1].replace(quote, ''),
      type: 'template'
    });
  }

  return ngHotTemplate;
}

/**
 * @description - 分析路由声明中控制器
 * @param {string} template
 * @returns {Array}
 *
 * @example
 * import { SidebarController } from './flow/sidebar.controller
 */
export function analyzeControllerReg(template) {
  let middleware;
  let ngHotController = [];

  while (middleware = controllerCaptureReg.exec(template)) {
    ngHotController.push({
      location: middleware[2],
      name: middleware[1],
      type: 'controller'
    });
  }

  return ngHotController;
}