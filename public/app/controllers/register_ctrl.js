App.controller('RegisterCtrl', function($scope, $http, $location) {
  $scope.addUser = function() {
    $http.post('/users', $scope.newUser).success(function (user) {
      $location.path('/');
    }).error(function (error) {
      $scope.errorMessage = error.error;
    });
  };
});