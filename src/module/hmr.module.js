/**
 * @description - ng-hot-loader route possible
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import { analyzeFactoryReg, analyzeFilterRef } from './module.parse';
import { produceHotFeatureModule } from './module.engine';

export function transformHotModule(input, query) {
  let filterRefs = analyzeFilterRef(input, query.prefix);
  let factoryRefs = analyzeFactoryReg(input, query.prefix);
  let criticRefs = [...filterRefs, ...factoryRefs];
  let hotModuleCode = produceHotFeatureModule(criticRefs);

  return `
    ${input}
    ${hotModuleCode}
  `;
}