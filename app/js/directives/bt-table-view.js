app.directive('btTableView', function ($filter) {
    return {
        restrict: 'A',
        templateUrl: 'templates/partials/table.html',
        transclude:true,

        link: function ($scope, element, attrs) {
            $scope.orderByField = 'firstName';
            $scope.reverseSort = false;
            $scope.columns = ['id', 'status', 'type', 'assignee', 'createdDate'];

            var orderBy = $filter('orderBy');
            $scope.order = function (predicate, reverse) {
                $scope.tickets = orderBy($scope.tickets, predicate, reverse);
            };
            $scope.order('-id', false);

            $scope.totalItems = $scope.tickets.length;
            $scope.currentPage = 1;
            $scope.numPerPage = 5;
            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };
            $scope.paginate = function (value) {
                var begin, end, index;
                begin = ($scope.currentPage - 1) * $scope.numPerPage;
                end = begin + $scope.numPerPage;
                index = $scope.tickets.indexOf(value);

                return (begin <= index && index < end);
            };


        }
    }
});
