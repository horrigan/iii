app.controller('AddColCtrl', function ($scope, $state, $stateParams, boardTicket, Ticket) {
    $scope.ticket = boardTicket;
    $scope.edit = function (ticket) {
        Ticket.update({_id: ticket._id}, ticket).$promise
            .then(function () {
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            })
    };

    $scope.remove = function (ticket) {
        Ticket.delete({_id: ticket._id}).$promise
            .then(function () {
                $state.go('board')
            })
    };

    $scope.addComment = function (commentData) {
        commentData.date = new Date();
        ticket.comments.push(commentData);
        Ticket.update({_id: $stateParams.id}, ticket);
    }


});