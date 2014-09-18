app.controller('EditTicketCtrl', function ($scope, $stateParams, $http, Ticket, $state, promiseEditObj) {
        $scope.ticket = promiseEditObj;

        $scope.edit = function (ticket) {
            Ticket.update({_id: ticket._id.$oid}, ticket).$promise
                .then($state.go('home'))
        };

        $scope.remove = function (ticket) {
            Ticket.delete({_id: ticket._id.$oid}).$promise
                .then($state.go('home'))
        };

        $scope.addComment = function () {
            var commentData = {
                comment_author: $scope.ticketComment.comment_author || 'Anonymous',
                comment: $scope.ticketComment.comment || '',
                comment_time: new Date()
            };
            $scope.ticket.comments.push(commentData);

            Ticket.update({id: $stateParams.id}, $scope.ticket);

        }

    }
);



