app.controller('BoardCtrl', function ($scope, $http, $filter, Ticket) {
        var bugsBoard = Ticket.query();
        bugsBoard.$promise.then(
            function (result) {
                $scope.bugs = result;
            }
        );
    }
);





