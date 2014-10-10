angular.module('bugtracker').directive('btTicket', function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partials/ticket.html'
    }
});
