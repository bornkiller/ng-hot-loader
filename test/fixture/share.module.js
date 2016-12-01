/**
 * @description - share module combine several controller, filter, service, directive
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

// share module dependency
import { postfixFilter } from './filter/postfix.filter';
import { promptFactory } from './service/prompt.factory';
import { FighterService } from './service/fighter.service';
import { validateCaptchaDirective } from './directive/validate.directive';

// share module route dependency
import lovePageTemplate from './template/love.html';
import todoPageTemplate from './template/todo.html';
import { LoveController } from './controller/love.controller';
import { TodoController } from './controller/todo.controller';

// share module name
const SHARE_MODULE = 'app.share';

// share module route
const ShareRoute = [
  {
    name: 'application.love',
    url: '/love',
    views: {
      'page': {
        template: lovePageTemplate,
        controller: LoveController,
        controllerAs: 'vm'
      }
    }
  },
  {
    name: 'application.todo',
    url: '/todo',
    views: {
      'page': {
        template: todoPageTemplate,
        controller: TodoController,
        controllerAs: 'vm'
      }
    }
  }
];

/**
 * @description - never declare any dependency here, because dependency should declare into root module
 */
angular.module(SHARE_MODULE, [])
  .filter('bkPostfix', postfixFilter)
  .factory('bkPrompt', promptFactory)
  .service('bkFighter', FighterService)
  .directive('bkValidateCaptcha', validateCaptchaDirective)
  // eslint-disable-next-line angular/di
  .config(['$stateProvider', function ($stateProvider) {
    ShareRoute.forEach((route) => {
      $stateProvider.state(route);
    });
  }]);

// just export module name for root module
export { SHARE_MODULE };