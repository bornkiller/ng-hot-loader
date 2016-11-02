/**
 * @description - ng-hot-loader route possible
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import { camelCase } from 'lodash';

import { analyzeModalTemplateRef, fireModalHotAccept } from './parse';

export function transformModalTemplate (input, resourcePath) {
  // additional html markup for identity
  let ngModalIdentity = `<!-- @ngModalIdentity ${resourcePath} -->`;
  
  return `${ngModalIdentity} \n ${input}`;
}

export function hotModalAcceptor (input) {
  let templateRefs = analyzeModalTemplateRef(input);
  let modalHotAccept = fireModalHotAccept(templateRefs);
  
  console.log(templateRefs);
  console.log(modalHotAccept);
  
  return `
    ${input}
    ${modalHotAccept}
  `;
}