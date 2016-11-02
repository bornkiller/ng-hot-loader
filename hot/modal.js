/**
 * @description - ng-hot-loader route possible
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

export default function (input, resourcePath) {
  // additional html markup for identity
  let ngModalIdentity = `<!-- @ngModalIdentity ${resourcePath} -->`;

  return `${ngModalIdentity} \n ${input}`;
}