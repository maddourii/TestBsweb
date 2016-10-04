angular.module('employees.controllers', [])
    .controller('HomeCtrl', function($scope, $rootScope, $stateParams, $state, $mdDialog, EmployeesService) {
        /*sorting var */
        $scope.sortType     = 'Name';
        $scope.sortReverse  = false;

        /*loading Emloyees list*/
        $scope.loadEmployees = function() {

            EmployeesService.getAll().then(function successCallback(response) {
                $scope.employees = response.data;
            }, function errorCallback(response) {
                $scope.employees = {};
                console.log('erreur')
            });

        };
        $scope.loadEmployees();

        /*getFunction*/
        /*Adding new Employee*/
        /*Vars*/
        $scope.formData = {};
        $scope.submitted = false;
        /*ADD function*/
        $scope.createEmployee = function(form) {
            if (form.$valid) {
                EmployeesService.create($scope.formData)
                    .success(function(data) {
                        $state.go('home');
                        $scope.submitted = false;
                    })
                    .error(function(data, status) {
                        console.log('error')
                    });
            } else {
                $scope.submitted = true;
            }
        };
        /*delete function*/
        $scope.deleteEmployee = function(ev, employee) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Delete This Employee?')
                .targetEvent(ev)
                .ok('Okay')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                EmployeesService.delete(employee)
                    .success(function(data) {
                        EmployeesService.getAll().then(function(response) {
                            $scope.employees = response.data;
                        });
                    })
                    .error(function(data, status) {
                        console.log('erreur')
                    });
            }, function() {});
        };
    })
    .controller('EmployeeEditCtrl', function($scope, $rootScope, $stateParams, $state, EmployeesService) {
        /*Load Employee By id*/
        $scope.loadEmployee = function() {
            $scope.id = $stateParams.id;
            EmployeesService.getOne($scope.id).then(function successCallback(response) {
                $scope.employee = response.data;
            }, function errorCallback(response) {
                $scope.employee = {};
                console.log('erreur')
            });
        };
        $scope.loadEmployee();
        /*var*/
        $scope.submitted = false;
        /*Update Function*/
        $scope.UpdateEmployee = function(form) {
            if (form.$valid) {
                var employee = $scope.employee;
                EmployeesService.update(employee)
                    .success(function(data) {
                        $state.go('home');
                        $scope.submitted = false;
                    })
                    .error(function(data, status) {
                        console.log('error')
                    });
            } else {
                $scope.submitted = true;
            }
        };
    })
    .controller('EmployeeDetailsCtrl', function($scope, $rootScope, $stateParams, $state, EmployeesService) {
        /*Load Employee By id*/
        $scope.loadEmployee = function() {
            $scope.id = $stateParams.id;
            EmployeesService.getOne($scope.id).then(function successCallback(response) {
                $scope.employee = response.data;
            }, function errorCallback(response) {
                $scope.employee = {};
                console.log('erreur')
            });
        };
        $scope.loadEmployee();
    })
    .controller('chartsCtrl', function($scope, $rootScope, $stateParams, $state, $mdDialog, EmployeesService){

      /*static Function*/
      $scope.GetCharts = function() {
          EmployeesService.getAll().then(function successCallback(response) {
              var employees = response.data;
              getPieCharts(employees);
              getLineCharts(employees);
          }, function errorCallback(response) {
              $scope.employees = {};
              console.log('erreur')
          });

      };
      $scope.GetCharts();

      var getPieCharts=function(emp){
        var countgte30=0;
        var countlt30=0;
        for(var i=0;i<emp.length;i++){
          if(emp[i].Age>=30){
            countgte30 ++;
          }else{
            countlt30++;
          }
        }
        $scope.dataPie=[countlt30,countgte30];
        $scope.labelPie=['Employee younger than 30','Employee older than 30']
      };
      var getLineCharts=function(emp){
        $scope.dataLine=[];
        var dataline=[];
        var labelLine=[2010,2011,2012,2013,2014,2015,2016,2017];

        for (i=0;i<labelLine.length;i++){
          var empfound=_.filter(emp, function(o) { return o.Year==labelLine[i]; });
          dataline.push(empfound.length);
        };
        $scope.dataLine.push(dataline);
        $scope.labelLine=['2010','2011','2012','2013','2014','2015','2016','2017'];
      };

    });
