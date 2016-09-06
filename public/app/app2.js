'use strict';

angular.module('ngAsiasApp', [
    'ngRoute',
    'ngAsiasApp.services',
    'ngAsiasApp.controllers',
    'datetimepicker'
]).
filter('htmlToPlaintext', function() {
        return function(text) {
            return text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
    })
    .config(function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/intpl-list.html',
                controller: 'IntplListCtrl'
            })
            .when('/intpl-detail/:id', {
                templateUrl: 'app/views/intpl-detail.html',
                controller: 'IntplDetailCtrl'
            })
            .when('/countries', {
                templateUrl: 'app/views/countries-list.html',
                controller: 'CountriesCtrl'
            })
            .when('/customs-offices', {
                templateUrl: 'app/views/customs-offices-list.html',
                controller: 'CustomsOfficesCtrl'
            })
            .when('/authorities', {
                templateUrl: 'app/views/authorities-list.html',
                controller: 'AuthoritiesCtrl'
            })
            .when('/subjects', {
                templateUrl: 'app/views/subjects-list.html',
                controller: 'SubjectsCtrl'
            })
            .when('/email-list', {
                templateUrl: 'app/views/listEmails.view.html',
                controller: 'EmailListCtrl'
            })
            .when('/email-import/:id', {
                templateUrl: 'app/views/importEmail.view.html',
                controller: 'EmailImportCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config([
        'datetimepickerProvider',
        function(datetimepickerProvider) {
            datetimepickerProvider.setOptions({
                format: 'DD-MM-YYYY'
            });
        }
    ]);
