app.controller('AddTicketCtrl', function ($scope, $http, $state, $stateParams, Ticket, limitToFilter, constant, Author, $q) {
    $scope.authors = function (value) {
        var d = $q.defer();
        var results = Author.query({q: {name: value}}, function () {
            var x = d.resolve(results);
            var names = [];
            angular.forEach(results, function (item) {
                names.push(item.name + ' ' + item.surname);

            });
            return results;
        });
        return d.resolve
    };
    $scope.date = new Date();
    $scope.status = 'todo';
    $scope.postBugToDb = function (bug) {
        Ticket.query({s: {"id": -1}, l: 1}).$promise
            .then(function (data) {
                (data.length === 0) ? bug.id = 1 : bug.id = data[0].id + 1;
                bug.createdDate = $scope.date;
                bug.status = 'todo';
                bug.comments = [];
                Ticket.save(bug).$promise
                    .then(function () {
                        $state.go('board')
                    })
            });

    };
});
