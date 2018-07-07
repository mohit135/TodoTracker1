/*global console:false, angular:false */
(function () {
    'use strict';

    function repeat(arr, times) {
        var result = [], i = 0;
        function push(val) { result.push(angular.copy(val)); }
        for (i = 0; i < times; i += 1) {
            angular.forEach(arr, push);
        }
        return result;
    }
    
    angular.module('demo', ['simpleGrid'])
        .controller('MainCtrl', function ($scope, $filter, $log) {
            // an example grid config
            $scope.gridConfig = {
                options: {
                    showDeleteButton: true,
                    showEditButton: true,
                    editRequested: function (row) { console.log('edit request:', row); },
                    rowDeleted: function (row) { console.log('deleted:', row); },
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
            
          
            $scope.data = [ { name: 'Jooka',status: 1, dueBy: '1993-07-27T22:33:59+04:00', createdOn: '1993-07-27T22:33:59+04:00'},
                            { name: 'Schmo',status: 1, dueBy: '1993-07-27T22:33:59+04:00', createdOn: '1993-07-27T22:33:59+04:00'},
                            { name: 'Sparky',status: 1, dueBy: '1993-07-27T22:33:59+04:00', createdOn: '1993-07-27T22:33:59+04:00'}
                          ];
            
            $scope.data = repeat($scope.data, 5);
            
            // an empty grid: same options, no data.
            $scope.emptyData = [];
            $scope.gridConfigEmpty = { options: $scope.gridConfig.options, getData: function () { return $scope.emptyData; } };

            // utility stuff
            $scope.movePage = function (offset) {
                $scope.gridConfig.options.pageNum += offset;
                $scope.gridConfig.options.pageNum = Math.max(0, $scope.gridConfig.options.pageNum);
            };
            
            $scope.filterDeleted = function (rows) {
                // TODO: Exteremly inefficient...
                var filtered = rows.filter(function (row) { return !row.$deleted; });
                rows.splice(0, rows.length);
                angular.forEach(filtered, function (item) {
                    rows.push(item);
                });
            };

            $scope.addRow = function () {
                var data = $scope.gridConfig.getData();
                data.push(
                    {
                        $added: true,
                        $editable: true
                    }
                );
                $scope.gridConfig.options.pageNum = Math.floor(data.length / $scope.gridConfig.options.pageSize);
            };
        });

}());
