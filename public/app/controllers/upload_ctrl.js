App.controller('UploadCtrl', function($scope, $http, $location) {
  $scope.addUser = function() {
    $http.post('/users', $scope.newUser).success(function (user) {
      $location.path('/');
    }).error(function () {
      $scope.errorMessage = "Username is already taken";
    });
  };
});