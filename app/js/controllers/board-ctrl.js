app.controller('BoardCtrl', function ($scope, $http, tickets, Ticket, $state, $stateParams) {
        $scope.tickets = tickets;

        $scope.addCol = function (ticket) {
            $state.go('board.add-col', { id: ticket._id })
        };
        $scope.statuses = ['todo', 'inprogress', 'resolved'];

        $scope.dropColumn = function (ticket, column) {
            angular.forEach($scope.tickets, function (item) {
                if (item.id === ticket.id) {
                    item.status = column;
                    Ticket.update({_id: item._id}, item).$promise.then(function () {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    })
                }
            });
        };
    }
);
