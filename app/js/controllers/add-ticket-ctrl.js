app.controller('AddTicketCtrl', function ($scope, $http, $state, $stateParams, Ticket) {
    $scope.date = new Date();
    $scope.status = 'todo';
    Ticket.query().$promise.then(
        function (data) {
            $scope.newBug = data;
            $scope.newId = data.length + 1
        }
    );
    $scope.postBugToDb = function (bug) {
        bug.date = $scope.date;
        bug.status = 'todo';
        bug.id = $scope.newId;
        bug.comments = [];
        Ticket.save(bug).$promise
            .then($state.go('home'))
    };
});
