/**
 * @description - ng-hot-loader util
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

'use strict';

export function ensureInstanceToken(name, prefix) {
  let basename = name.replace(/(Filter|Factory)$/, '');

  return prefix ? prefix + basename.charAt(0).toUpperCase() + basename.slice(1) : basename;
}