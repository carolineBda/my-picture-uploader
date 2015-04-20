'use strict';

angular.module('pictureUploaderApp', [
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  })
  .controller('MainCtrl', function ($scope, $http) {
    $scope.sendUser = function () {
      var user = {
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        email: $scope.email
      };
      $http.post('/api/user', user)
        .success(function () {
          delete $scope.errorMessage;
          $scope.successMessage = 'A confirmation email has been sent to you.';
        })
        .error(function(err) {
          $scope.errorMessage = err.message;
        });
    };
  });

