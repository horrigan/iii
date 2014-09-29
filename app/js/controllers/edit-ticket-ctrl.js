app.controller('EditTicketCtrl', function ($scope, $stateParams, $http, Ticket, $state, ticket) {
        $scope.ticket = ticket;
        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };

        $scope.ticket.trackedTime = '1h 30m';
        $scope.totalTime = function () {

            var dateObj = {
                days: parseInt($scope.ticket.trackedTime.match(/ *(\d+)([d])/gm) || 0),
                hours: parseInt($scope.ticket.trackedTime.match(/ *(\d+)([h])/gm) || 0),
                min: parseInt($scope.ticket.trackedTime.match(/ *(\d+)([m])/gm) || 0),
                sec: parseInt($scope.ticket.trackedTime.match(/ *(\d+)([s])/gm) || 0)
            };
            var allSec = (dateObj.days * 60 * 60 * 8) + (dateObj.hours * 60 * 60) + (dateObj.min * 60) + dateObj.sec;
            var days = parseInt(allSec / (60 * 60 * 8));
            var hours = parseInt((allSec - (days * 60 * 60 * 8)) / (60 * 60));
            var min = parseInt((allSec - ((days * 60 * 60 * 8) + (hours * 60 * 60))) / 60);
            var sec = parseInt(allSec - ((days * 60 * 60 * 8) + (hours * 60 * 60) + (min * 60)));
            return days + ' days ' + hours + ' hours ' + min + ' min ' + sec + ' sec ';

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
        $scope.addTrackedTime = function (ticket) {
            ticket.trackedTimeArr.push(ticket.trackedTime);
            Ticket.update({_id: $stateParams.id}, ticket).$promise
                .then(function () {
                    $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
                });

        }
    }
);


