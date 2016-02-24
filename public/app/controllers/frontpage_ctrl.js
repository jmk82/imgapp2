App.controller('FrontPageCtrl', function($scope, $http, $location) {
  $scope.images = [];

  var query = '';
  $scope.startImage = parseInt($location.search().start) || 1;
  $scope.imagesPerPage = $location.search().limit || '6';

  if ($location.search().limit) {
    query += '?limit=' + $location.search().limit;
  } else {
    query += '?limit=' + $scope.imagesPerPage;
  }
  if ($location.search().start) {
    query += '&start=' + $location.search().start;
  }

  $scope.next = function () {
    $scope.startImage = parseInt($location.search().start) || $scope.startImage;
    $scope.startImage += parseInt($location.search().limit) || parseInt($scope.imagesPerPage);
    $location.url('/?start=' + $scope.startImage + '&limit=' + $scope.imagesPerPage);
  };

  $scope.prev = function () {
    $scope.startImage = parseInt($location.search().start) || $scope.startImage;
    $scope.startImage -= parseInt($location.search().limit) || parseInt($scope.imagesPerPage);
    if ($scope.startImage < 1) {
      $scope.startImage = 1;
    }
    $location.url('/?start=' + $scope.startImage + '&limit=' + $scope.imagesPerPage);
  };

  $http.get('/images' + query).success(function (pics) {
    pics.forEach(function (image) {
      $scope.images.push( { src: '/images/' + image.filename, id: image.id });
    });
  });
});