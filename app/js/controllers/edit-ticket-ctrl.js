app.controller('EditTicketCtrl', function ($scope, $stateParams, $http, Ticket, $state) {
        Ticket.get({id:$stateParams.id}).$promise.
            then(function (data) {
                $scope.ticket = data[0];
        });

        $scope.edit = function (ticket) {
            Ticket.update({id: ticket._id}, ticket);
            /*
             .$promise
             .then($state.go('home'))*/
        };

        $scope.remove = function (ticket) {
            Ticket.delete({_id: ticket._id.$oid});
                /*
                .$promise
                .then($state.go('home'))*/
        };

        $scope.addComment = function () {
            var commentData = {
                comment_author: $scope.ticketComment.comment_author || 'Anonymous',
                comment: $scope.ticketComment.comment || '',
                comment_time: new Date()
            };
            $scope.ticket.comments.push(commentData);
            delete $scope.ticket._id;
            Ticket.update({id: myId}, $scope.ticket);

        }
    }
);



