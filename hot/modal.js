/**
 * @description - ng-hot-loader route possible
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import path from 'path';
import { camelCase } from 'lodash';

import { analyzeModalTemplateRef, fireModalHotAccept } from './parse';

export function transformModalTemplate (input, resourcePath) {
  // additional html markup for identity
  let identity = path.relative(process.cwd(), resourcePath);
  let ngModalIdentity = `<!-- @ngModalIdentity ${identity} -->`;
  
  return `${ngModalIdentity} \n ${input}`;
}

export function hotModalAcceptor (input) {
  let templateRefs = analyzeModalTemplateRef(input);
  let modalHotAccept = fireModalHotAccept(templateRefs);

  return `
    ${input}
    ${modalHotAccept}
  `;
}