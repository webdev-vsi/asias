'use strict';


angular.module('ngAsiasApp', [
        'ngRoute',
        'ngAsiasApp.services',
        'ngAsiasApp.controllers',
        'datetimepicker',
        'ui-notification',
        'angularMoment',
        'ui.bootstrap',
        'angular-loading-bar',
    ])
    .filter('htmlToPlaintext', function() {
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
            .when('/reports', {
                templateUrl: 'app/views/reports.view.html',
                controller: 'ReportsCtrl'
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
    ])
    .config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 5000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
    });
