/**
 * @description - ng-hot-loader route possible
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import path from 'path';
import { camelCase } from 'lodash';

import { analyzeModalTemplateRef, analyzeModalControllerRef } from './modal.parse';
import { produceHotModal } from './modal.engine';

/**
 * @description - additional html markup for identity
 *
 * @param input
 * @param resourcePath
 *
 * @return {string}
 */
export function transformModalTemplate(input, resourcePath) {
  let identity = path.relative(process.cwd(), resourcePath).replace(/(\/|\.)/g, '-').toLowerCase();
  let hmrModalIdentity = `<!-- @hmr_modal_identity ${identity} -->`;

  return `${hmrModalIdentity} \n ${input}`;
}

/**
 * @description - additional class markup for identity
 * @param input
 * @param resourcePath
 * @return {string}
 */
export function transformModalController(input, resourcePath) {
  let hmrModalIdentity = path.relative(process.cwd(), resourcePath).replace(/(\/|\.)/g, '-').toLowerCase();
  let modalFileName = camelCase(path.basename(resourcePath, '.modal.controller.js')) + 'ModalController';
  let modalDeclareName = modalFileName.charAt(0).toUpperCase() + modalFileName.slice(1);

  return `${input} \n ${modalDeclareName}.hmr_modal_identity = '${hmrModalIdentity}'`;
}

export function transformHotModal(input) {
  let templateRefs = analyzeModalTemplateRef(input);
  let controllerRefs = analyzeModalControllerRef(input);
  let criticModalRefs = [...templateRefs, ...controllerRefs];
  let hotModalCode = produceHotModal(criticModalRefs);

  return `
    ${input}
    ${hotModalCode}
  `;
}