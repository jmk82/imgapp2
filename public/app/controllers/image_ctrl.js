App.controller('ImageCtrl', function($scope, $rootScope, $http, $routeParams, $location) {
  $http.get('/images/' + $routeParams.id).success(function (image) {
    image.Comments.forEach(function (comment) {
      if (!(comment.User && comment.User.username)) {
        comment.User = {};
        comment.User.username = 'Anon';
      }
    });
    $scope.image = image;
    console.log(image);
  });

  $scope.comment = function() {
    $http.post('/images/' + $routeParams.id + '/comment', $scope.newComment).success(function (comment) {
      comment.User = $rootScope.userLoggedIn || { username: 'Anon'};
      $scope.image.Comments.push(comment);
    });
  };
});