app.controller('AddTicketCtrl', function ($scope, $http, $state, $stateParams, Ticket, promiseNewObj) {
    $scope.date = new Date();
    $scope.status = 'todo';
    $scope.newId = promiseNewObj.length + 1;
    $scope.postBugToDb = function (bug) {
        bug.createdDate = $scope.date;
        bug.status = 'todo';
        bug.id = $scope.newId;
        bug.comments = [];
        Ticket.save(bug).$promise
            .then($state.go('home'))
    };
});
