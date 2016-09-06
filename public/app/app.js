var app = angular.module('asias', ['ngRoute','ngResource']);



app.config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when('/',{
      templateUrl: 'app/views/interpelations.view.html',
      controller:  'InterpelationsCtrl'
    }).
    when('/interpelations/:id', {
      templateUrl: 'app/views/editInterpelation.view.html',
      controller: 'ResourceController'
    }).
    when('/listEmails', {
      templateUrl: 'app/views/listEmails.view.html',
      controller: 'ListEmailsCtrl'
    }).
    otherwise({redirectTo:'/'})
}]);
