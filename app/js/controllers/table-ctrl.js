app.controller('TableCtrl', function ($scope,tickets) {
    $scope.myData = tickets;
    $scope.gridOptions = {
        data: 'myData',
        enableColumnReordering: true,
        enableColumnResize: true,
        enablePaging: true,
        columnDefs: [
            {field: 'id',displayName:'Id'},
            {field: 'title',displayName:'Title'},
            {field: '_id', visible: false},
            {field: 'createdDate', cellFilter: 'date',displayName:'Created date'},
            {field: 'assignee',displayName:'Assignee'},
            {field: 'description',displayName:'Description'},
            {field: 'priority',displayName:'Priority'},
            {field: 'type',displayName:'Type'},
        ]
    };
});
