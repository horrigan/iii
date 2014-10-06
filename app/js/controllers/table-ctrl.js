app.controller('TableCtrl', function ($scope, tickets, $filter) {
    $scope.tickets = tickets;
    var columnsHeaders = [];
    angular.forEach($scope.tickets[0], function (value, key) {
        this.push(key);
    }, columnsHeaders);
    $scope.columnsHeaders = columnsHeaders.sort();
    $scope.templateObj = {
        _id: function (cell) {
            return '<div class=column_id><a ' + ' href=/#/edit-ticket/' + cell + '>' + cell + '</a>'
        },
        trackedTimeArr: function (cell) {
            var trackedComments = [];
            angular.forEach(cell, function (value) {
                this.push(value);
            }, trackedComments);
            var date = trackedComments[0] ? trackedComments[0].date : ' ';
            var author = trackedComments[0] ? trackedComments[0].author : ' ';
            var minutes = trackedComments[0] ? trackedComments[0].time : ' ';
            return  '<div>' +
                '<div>' + author + '</div>' +
                '<div>' + minutes + '</div>' +
                '<div>' + date + '</div>' +
                '</div>'

        },
        createdDate: function (cell) {
            var filteredCell = $filter('date')(cell, 'dd/MM/yyyy')
            return '<div>' + filteredCell + '</div>'
        }

    }


});
