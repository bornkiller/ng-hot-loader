/**
 * @ngdoc directive
 * @name App.directive:validateCaptcha
 * @restrict A
 * @scope
 *
 * @description - validate telephone number
 */
export /* @ngInject */ function validateCaptchaDirective() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      callback: '&'
    },
    link: function ($scope, $element, $attr, $ctrl) {
      $ctrl.$validators.validTelNumber = function (value) {
        $scope.callback({value: value});
        return /[0-9]{11}/.test(value);
      };
    }
  };
}