var App = angular.module('ImgApp', ['ngRoute'])

App.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
  $httpProvider.defaults.cache = false;
  if (!$httpProvider.defaults.headers.get) {
    $httpProvider.defaults.headers.get = {};
  }
  // disable IE ajax request caching
  $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

  var auth = {
    userLoggedIn: function($rootScope, $http) {
      return $http.get('/users/logged-in').success(function(user) {
        $rootScope.userLoggedIn = user.id ? user : null;
      });
    }
  };

  $routeProvider
    .when('/', {
      controller: 'FrontPageCtrl',
      templateUrl: '/app/views/frontpage.html',
      resolve: auth
    })

    .when('/register', {
      controller: 'RegisterCtrl',
      templateUrl: 'app/views/register.html',
      resolve: auth
    })

    .when('/login', {
      controller: 'LoginCtrl',
      templateUrl: 'app/views/login.html',
      resolve: auth
    })

    .when('/upload', {
      templateUrl: 'app/views/upload.html',
      resolve: auth
    })

    .when('/users/list', {
      controller: 'UserListCtrl',
      templateUrl: 'app/views/userlist.html',
      resolve: auth
    })

    .when('/users/:id', {
      controller: 'UserCtrl',
      templateUrl: 'app/views/user.html',
      resolve: auth
    })

    .when('/images/:id', {
      controller: 'ImageCtrl',
      templateUrl: 'app/views/image.html',
      resolve: auth
    });
}]);

App.run(['$rootScope', '$http', '$location', function ($rootScope, $http, $location) {
  $rootScope.logout = function() {
    $http.get('/users/logout').success(function() {
      $rootScope.userLoggedIn = null;
      $location.path('/');
    });
  }
}]);