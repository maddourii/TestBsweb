'use strict';

angular.module('employees.services', [])
    .factory('EmployeesService', function($http) {

        var crudEmployee = {};
        var url = "http://localhost:3000/api/employees/";
        crudEmployee.getAll = function() {
            return $http({
                url: url,
                method: 'GET'
            });
        };


        crudEmployee.create = function(employee) {
            return $http({
                url: url,
                method: 'POST',
                data: employee
            });
        };


        crudEmployee.getOne = function(id) {
            return $http({
                url: url + id,
                method: 'GET',
            });
        };


        crudEmployee.update = function(employee) {
            return $http({
                url: url + employee._id,
                method: 'PUT',
                data: employee,
            });
        };


        crudEmployee.delete = function(employee) {
            return $http({
                url: url + employee._id,
                method: 'DELETE',
            });
        };

        return crudEmployee;
    });
