app.controller('BoardCtrl', function ($scope, $http, tickets, $filter) {
        $scope.tickets = tickets;

        var todo = $filter('filter')($scope.tickets, { status: "todo" });
        var inprogress = $filter('filter')($scope.tickets, { status: "inprogress" });
        var resolved = $filter('filter')($scope.tickets, { status: "resolved" });


        $scope.models = {
            selected: null,
            dropzones: {
                "todo": todo,
                "inprogress": inprogress,
                "resolved": resolved
            }
        };
    }
);
