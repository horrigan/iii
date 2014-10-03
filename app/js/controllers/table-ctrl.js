app.controller('TableCtrl', function ($scope, tickets) {
    $scope.tickets = tickets;
    var columnsHeaders = [];
    angular.forEach($scope.tickets[0], function (value, key) {
        this.push(key);
    }, columnsHeaders);
    $scope.columnsHeaders = columnsHeaders.sort();
    $scope.templateTd = '<div class="newclasss"></div>'
});
