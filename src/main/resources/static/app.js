/*global console:false, angular:false */
(function () {
    'use strict';
    
    angular.module('demo', ['simpleGrid'])
        .controller('MainCtrl', function ($scope, $filter, $log, $http) {
        	$scope.toggle = false;
            // an example grid config
            $scope.gridConfig = {
                options: {
                    showDeleteButton: true,
                    showEditButton: true,
                    editRequested: function (row) { /*var task = { name: row.name,
                    		status: row.status, 
                    		dueBy: row.dueBy, 
                    		createdOn: row.createdOn};
                    		$scope.update(task);*/
                    },
                    rowDeleted: function (row) { $scope.delete(row.name); },
                    cellFocused: function (row, column) { console.log('focused:', row, column); },
                    rowSelected: function (row) { console.log('selected:', row); },
                    //orderBy: 'age',
                    //reverseOrder: false,
                    editable: true, // true is the default - set here manually to true to make it easier to bind to in the demo html
                    disabled: false,
                    perRowEditModeEnabled: true,
                    allowMultiSelect: true,
                    pageSize: 5,
                    pageNum: 0,
                    dynamicColumns: true,
                    columns: [
                        {
                            field: 'name',
                            title: 'To-Do item',
                            required: true
                        },
                        {
                            field: 'createdOn',
                            title: 'Created On',
                            inputType: 'date',
                            formatter: function (value) { return $filter('date')(value, 'MM/dd/yyyy'); }
                        },
                        {
                            field: 'dueBy',
                            title: 'Due By',
                            inputType: 'date',
                            formatter: function (value) { return $filter('date')(value, 'MM/dd/yyyy'); }
                        },
                        {
                            field: 'status',
                            title: 'Status',
                        	inputType: 'select',
                            options: [{ value: 0, title: 'Pending'}, { value: 1, title: 'Completed'}],
                            formatter: function(item) { return item.title; },
                            select: function(item) { return item.value; }
                        }
                    ]
                },
                getData: function () { return $scope.data; }
            };
            
            $scope.getTodoTasks = function(){
            	$scope.data = [];
            	$scope.toggle = true
            	$http.get("/getTask")
                .then(function(response) {
                    //First function handles success
                	$scope.data = response.data;
                }, function(response) {
                    //Second function handles error
                    $scope.content = "Something went wrong";
                });
            }
            	
            	
            	
            
            $scope.task = { name: '',
            		status: 0, 
            		dueBy: '', 
            		createdOn: ''};
            
            
            $scope.reset = function(){
            	$scope.task = { name: '',
                		status: 1, 
                		dueBy: '', 
                		createdOn: ''};
            }
            
            $scope.additems = function(){
            	$scope.toggle = false;
            	$scope.task = { name: '',
                		status: 1, 
                		dueBy: '', 
                		createdOn: ''
                			};
            }
            
            $scope.submit = function () {
                $http({
                    url: '/setTask',
                    method: "POST",
                    data: $scope.task
                })
                .then(function(response) {
                        $scope.info = response.data + ' row added';
                        console.log('here');
                        alert($scope.info);
                        $scope.getTodoTasks();
                }, 
                function(response) { 
                	console.log(response);
                });
            }
            
            $scope.delete = function (name) {
                $http({
                    url: '/deleteTask',
                    method: "DELETE",
                    data: name
                })
                .then(function(response) {
                        $scope.info = response.data + ' row Deleted';
                        console.log('here');
                        alert($scope.info);
                        $scope.getTodoTasks();
                }, 
                function(response) { 
                	console.log(response);
                });
            }
            
            $scope.update = function (row) {
                $http({
                    url: '/updateTask',
                    method: "PUT",
                    data: row
                })
                .then(function(response) {
                        $scope.info = response.data + ' row Updated';
                        console.log('here');
                        alert($scope.info);
                        $scope.getTodoTasks();
                }, 
                function(response) { 
                	console.log(response);
                });
            }
            
            // utility stuff
            $scope.movePage = function (offset) {
                $scope.gridConfig.options.pageNum += offset;
                var data = $scope.gridConfig.getData();
                $scope.gridConfig.options.pageNum = Math.min($scope.gridConfig.options.pageNum, Math.floor(data.length / $scope.gridConfig.options.pageSize));
                $scope.gridConfig.options.pageNum = Math.max(0, $scope.gridConfig.options.pageNum);
            };
            
        });

}());
