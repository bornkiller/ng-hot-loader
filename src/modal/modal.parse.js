/**
 * @description - parse *.route.js, and generate necessary HMR code
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

// 匹配 modal 模板引用路径,临时性方案处理,后续需要进一步树立
const modalTemplateCaptureReg = /template\:\s+require\((['"])(.+modal\.html)\1\)/g;
// 匹配弹窗控制器路劲
const modalControllerCaptureReg = /import\s+\{\s+(\w+ModalController)\s+\}\s+from\s+\'([^']+)\'/gm;
/**
 * @description - 分析控制器中声明中modal模板
 * @param {string} template
 * @returns {Array}
 *
 * @example
 * template: require('./flow/hmr.modal.html')
 */
export function analyzeModalTemplateRef(template) {
  let middleware;
  let ngHotModalTemplate = [];

  while (middleware = modalTemplateCaptureReg.exec(template)) {
    ngHotModalTemplate.push({
      location: middleware[2],
      type: 'template'
    });
  }

  return ngHotModalTemplate;
}

export function analyzeModalControllerRef(template) {
  let middleware;
  let ngHotController = [];

  while (middleware = modalControllerCaptureReg.exec(template)) {
    ngHotController.push({
      location: middleware[2],
      name: middleware[1],
      type: 'controller'
    });
  }

  return ngHotController;
}