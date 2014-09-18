app.controller('BoardCtrl', function ($scope, $http, Ticket) {
        Ticket.query().$promise.then(
            function (result) {
                $scope.bugs = result;
            }
        );
    }
);





