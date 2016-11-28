'use strict';

/**
 * @ngdoc filter
 * @name App.filter:postfix
 * @kind function
 */
export function postfixFilter() {
  /**
   * @description - Add postfix after any param
   *
   * @param {string} origin - the primitive content
   * @param {string} [flag=!] - the postfix for concat
   * @return {string} - formatted content
   */
  return function (origin, flag) {
    return origin.toString() + (flag || '');
  };
}