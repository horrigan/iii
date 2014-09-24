app.controller('AddTicketCtrl', function ($scope, $http, $state, $stateParams, Ticket, limitToFilter, constant, Author) {
    $scope.getAuthors = function (val) {
        return Author.search({q: JSON.stringify({name: {'$regex': val}})}).$promise.then(function (result) {
            var log = [];
            angular.forEach(result, function (value) {
                this.push(value.name + ' ' + value.surname);
            }, log);
            return log
        })
    };
    $scope.bug = {
        createdDate: new Date(),
        status: 'todo',
        comments: []
    };
    $scope.postBugToDb = function (bug) {
        Ticket.query({s: {"id": -1}, l: 1}).$promise
            .then(function (data) {
                bug.id = data.length ? data[0].id + 1 : 1;
                Ticket.save(bug).$promise
                    .then(function () {
                        $state.go('board')
                    })
            });
    };
});
