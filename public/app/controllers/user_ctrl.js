App.controller('UserCtrl', function($scope, $http, $routeParams) {
  $http.get('/users/' + $routeParams.id).success(function (user) {
    $scope.user = user;
  });

  // TODO: refactor
  $scope.showAll = function() {
    $http.get('/users/' + $routeParams.id + '?limit=10000').success(function (user) {
      $scope.user = user;
    });    
  }
});