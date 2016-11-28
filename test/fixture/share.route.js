/**
 * @description - collection sub-module level router config.
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

'use strict';

const TodoTemplate = require('./template/todo.html');

import { CollectionController } from './controller/collection.controller';

// router rule declare
export const ShareRoute = [
  {
    name: 'application.love',
    url: '/love',
    views: {
      'page': {
        template: require('./template/love.html'),
        controller: CollectionController,
        controllerAs: 'vm'
      }
    }
  },
  {
    name: 'application.todo',
    url: '/todo',
    views: {
      'page': {
        template: TodoTemplate,
        controller: CollectionController,
        controllerAs: 'vm'
      }
    }
  }
];