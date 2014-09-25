app.controller('AddTicketCtrl', function ($scope, $http, $state, $stateParams, Ticket, limitToFilter, constant, Author) {
    $scope.getAuthors = function (val) {
        return Author.search({q: JSON.stringify({name: {'$regex': val}})}).$promise.then(function (result) {
            var namesArr = [];
            angular.forEach(result, function (value) {
                this.push(value.name + ' ' + value.surname);
            }, namesArr);
            return namesArr
        })
    };
    $scope.ticket = {
        createdDate: new Date(),
        status: 'todo',
        comments: []
    };
    $scope.postTicketToDb = function (ticket) {
        Ticket.query({s: {"id": -1}, l: 1}).$promise
            .then(function (data) {
                ticket.id = data.length ? data[0].id + 1 : 1;
                Ticket.save(ticket).$promise
                    .then(function () {
                        $state.go('board')
                    })
            });
    };
});
