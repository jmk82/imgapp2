App.controller('UserListCtrl', function($scope, $http, $routeParams) {
  $http.get('/users/list').success(function (users) {
    $scope.users = users;
  });
});