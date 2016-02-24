App.controller('LoginCtrl', function($scope, $http, $location) {
  $scope.login = function() {
    $http.post('/users/login', $scope.user).success(function (user) {
      $location.path('/users/' + user.id);
    }).error(function () {
      $scope.errorMessage = "Login failed";
    });
  };
});