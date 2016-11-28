/**
 * @description - share module combine several controller, filter, service, directive
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import { promptFactory } from './service/prompt.factory';
import { FighterService } from './service/fighter.service';
import { postfixFilter } from './filter/postfix.filter';
import { ShowcaseController } from './controller/showcase.controller';
import { validateCaptchaDirective } from './directive/validate.directive';

import analyzerFactory from './service/analyzer.factory';
import CollectionController from './controller/collection.controller';

// share module name
const SHARE_MODULE = 'app.share';

/**
 * @description - never declare any dependency here, because dependency should declare into root module
 */
angular.module(SHARE_MODULE, [])
  .factory('bkPrompt', promptFactory)
  .factory('bkAnalyzer', analyzerFactory)
  .service('bkFighter', FighterService)
  .filter('bkPostfix', postfixFilter)
  .controller('ShowcaseController', ShowcaseController)
  .controller('CollectionController', CollectionController)
  .directive('bkValidateCaptcha', validateCaptchaDirective);

// just export module name for root module
export { SHARE_MODULE };