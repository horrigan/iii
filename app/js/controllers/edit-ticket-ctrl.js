angular.module('bugtracker').controller('EditTicketCtrl', function ($scope, $stateParams, $http, Ticket, $state, ticket) {
        $scope.ticket = ticket;
        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };



        $scope.edit = function (ticket) {
            Ticket.update({_id: ticket._id}, ticket).$promise
                .then(function () {
                    $state.transitionTo('board', $stateParams, { reload: true, inherit: false, notify: true })
                })
        };

        $scope.remove = function (ticket) {
            Ticket.delete({_id: ticket._id}).$promise
                .then(function () {
                    $state.transitionTo('board', $stateParams, { reload: true, inherit: false, notify: true })
                })
        };

        $scope.addComment = function (commentData) {
            commentData.date = new Date();
            ticket.comments.push(commentData);
            Ticket.update({_id: $stateParams.id}, ticket).$promise
                .then(function () {
                    $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
                });

        };

    }
);


