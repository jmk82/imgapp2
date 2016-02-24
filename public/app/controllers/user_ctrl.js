App.controller('UserCtrl', function($scope, $http, $routeParams) {
  $http.get('/users/' + $routeParams.id).success(function (user) {
    user.Images.forEach(function (image) {
      image.filename = '/images/' + image.filename;
    });
    $scope.user = user;
  });
});