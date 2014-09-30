app.controller('EditTicketCtrl', function ($scope, $stateParams, $http, Ticket, $state, ticket) {
        $scope.ticket = ticket;
        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };

        $scope.trackedTime = '1h 30m';
        $scope.totalTime = function (trackedTime) {
            var dateObj = {
                days: parseInt(trackedTime.match(/ *(\d+)([d])/gm) || 0),
                hours: parseInt(trackedTime.match(/ *(\d+)([h])/gm) || 0),
                min: parseInt(trackedTime.match(/ *(\d+)([m])/gm) || 0),
                sec: parseInt(trackedTime.match(/ *(\d+)([s])/gm) || 0)
            };
            var allSec = (dateObj.days * 60 * 60 * 8) + (dateObj.hours * 60 * 60) + (dateObj.min * 60) + dateObj.sec;
            var days = parseInt(allSec / (60 * 60 * 8));
            var hours = parseInt((allSec - (days * 60 * 60 * 8)) / (60 * 60));
            var min = parseInt((allSec - ((days * 60 * 60 * 8) + (hours * 60 * 60))) / 60);
            var sec = parseInt(allSec - ((days * 60 * 60 * 8) + (hours * 60 * 60) + (min * 60)));
            ticket.trackedCurrTask = days + ' days ' + hours + ' hours ' + min + ' min ' + sec + ' sec ';
            return ticket.trackedCurrTask

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
            ticket.trackedTimeArr.push(ticket.trackedCurrTask);
            Ticket.update({_id: $stateParams.id}, ticket).$promise
                .then(function () {
                    $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
                });

        }
    }
);


