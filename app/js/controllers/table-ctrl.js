app.controller('TableCtrl', function ($scope, tickets) {
    $scope.tickets = tickets;
    var columnsHeaders = [];
    angular.forEach($scope.tickets[0], function (value, key) {
        this.push(key);
    }, columnsHeaders);
    $scope.columnsHeaders = columnsHeaders.sort();
    $scope.templateObj = {
        id:'<div ng-bind="cell"></div>',
        _id:'<div ><a ui-sref="edit-ticket({id: cell})">edit</a></div>',
        assignee: '<div ng-bind="cell"></div>',
        comments: '<div ng-repeat="cellValue in cell">Author:<div class="table-cell" ng-bind="cellValue.author"></div>Comment:<div class="table-cell" ng-bind="cellValue.comment"></div>Date:<div class="table-cell" ng-bind="cellValue.date | date:dd/MM/yyyy"></div>',
        createdDate:'<div ng-bind="cell | date:dd/MM/yyyy"></div>',
        trackedTimeArr:'<div ng-repeat="cellValue in cell"><div class="table-cell" ng-bind="cellValue.author"></div><div class="table-cell" ng-bind="cellValue.name"></div><div class="table-cell" ng-bind="cellValue.time | minuteFilter"></div></div>',
        priority: '<div ng-bind="cell"></div>',
        description: '<div ng-bind="cell"></div>',
        title: '<div ng-bind="cell"></div>',
        type: '<div ng-bind="cell"></div>',
        status: '<div ng-bind="cell"></div>'
    }
});
