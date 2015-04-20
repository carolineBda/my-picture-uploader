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
    $('input[type=file]').bootstrapFileInput();

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

    $scope.$on('fileSelected', function (event, args) {
      $scope.loading = true;
      delete $scope.errorMessage;

      $scope.$apply(function () {
        var file = args.file;
        $http({
          method: 'POST',
          url: '/api/user/picture',
          headers: {'Content-Type': undefined},
          transformRequest: function (data) {
            var formData = new FormData();
            formData.append('file', data.file);
            return formData;
          },
          data: {file: file}
        }).success(function () {
          $scope.loading = false;
          delete $scope.errorMessage;
          $scope.pictureOk = true;
        }).error(function() {
          $scope.loading = false;
          $scope.errorMessage = 'Please select a picture with a face visible.';
        });
      });
    });
  })
  .directive('fileUpload', function () {
    return {
      scope: true,
      link: function (scope, el) {
        el.bind('change', function (event) {
          var file = event.target.files[0];
          scope.$emit('fileSelected', {file: file});
        });
      }
    };
  });

