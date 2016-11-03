/**
 * @description - ng-hot-loader route possible
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import path from 'path';
import { camelCase } from 'lodash';

import { analyzeModalTemplateRef, analyzeModalControllerRef, fireModalHotAccept } from './parse';

export function transformModalTemplate(input, resourcePath) {
  // additional html markup for identity
  let identity = path.relative(process.cwd(), resourcePath);
  let ngModalIdentity = `<!-- @ngModalIdentity ${identity} -->`;

  return `${ngModalIdentity} \n ${input}`;
}

export function transformModalController(input, resourcePath) {
  // additional class markup for identity
  let identity = path.relative(process.cwd(), resourcePath);
  let modalFileName = camelCase(path.basename(resourcePath, '.modal.controller.js')) + 'ModalController';
  let modalDeclareName = modalFileName.charAt(0).toUpperCase() + modalFileName.slice(1);

  return `${input} \n ${modalDeclareName}.modal_hmr_identity = '${identity}'`;
}

export function hotModalAcceptor(input) {
  let templateRefs = analyzeModalTemplateRef(input);
  let controllerRefs = analyzeModalControllerRef(input);
  let criticModalRefs = [...templateRefs, ...controllerRefs];
  let modalHotAccept = fireModalHotAccept(criticModalRefs);

  return `
    ${input}
    ${modalHotAccept}
  `;
}