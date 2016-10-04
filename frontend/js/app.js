
angular.module('employees', ['employees.controllers', 'employees.services', 'ui.router','ngAnimate','ngMaterial','chart.js','angular-loading-bar'])
    .config(function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'templates/employee/list.html',
                controller: 'HomeCtrl'

            })

            .state('employeeAdd', {
                url: '/employee/create',
                templateUrl: 'templates/employee/create.html',
                controller: 'HomeCtrl'

            })
            .state('charts', {
                url: '/charts',
                templateUrl: 'templates/employee/charts.html',
                controller: 'chartsCtrl'

            })
            .state('employeeDetails', {
                url: '/employee/:id/Edit',
                templateUrl: 'templates/employee/details.html',
                controller: 'EmployeeDetailsCtrl'

            })
            .state('employeeEdit', {
                url: '/employee/:id/Details',
                templateUrl: 'templates/employee/edit.html',
                controller: 'EmployeeEditCtrl'

            })
            ;
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');
    });
