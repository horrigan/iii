app.controller('EditTicketCtrl', function ($scope, $stateParams, $http, Ticket, $state, ticket) {
        $scope.ticket = ticket;

        $scope.edit = function (ticket) {
            Ticket.update({_id: ticket._id.$oid}, ticket).$promise
                .then(function () {
                    $state.go('board')
                })
        };

        $scope.remove = function (ticket) {
            Ticket.delete({_id: ticket._id.$oid}).$promise
                .then(function () {
                    $state.go('board')
                })
        };

        $scope.addComment = function (commentData) {
            commentData.date = new Date();
            ticket.comments.push(commentData);
            Ticket.update({_id: $stateParams.id}, ticket);
        }
    }
);



