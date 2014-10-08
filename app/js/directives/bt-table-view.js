app.directive('btTableView', function () {
    return {
        restrict: 'EA',
        scope: {
            items: '=data',
            template: '='
        },
        templateUrl: 'templates/partials/table.html',
        transclude: true,
        link: function (scope, element, attrs) {
            var columnsHeaders = [];
            angular.forEach(scope.items[0], function (value, key) {
                this.push({colName: key, valid: true});
            }, columnsHeaders);
            scope.columnsHeaders = columnsHeaders;

            var selectedArray = [];
            scope.selected = function (column) {
                if (selectedArray.indexOf(column) != -1) {
                    var index = selectedArray.indexOf(column);
                    if (index > -1) {
                        selectedArray.splice(index, 1);
                    }
                } else {
                    selectedArray.push(column)
                }
                scope.selectedColumns = selectedArray;
            };

            scope.orderByField = 'id';
            scope.reverseSort = false;
            scope.order = function (predicate, reverse) {
                scope.header = predicate;
                scope.reverseSort = reverse
            };
            scope.order('-id', false);
            scope.totalItems = scope.items.length;
            scope.currentPage = 1;
            scope.numPerPage = 5;

            scope.setPage = function (pageNo) {
                scope.currentPage = pageNo;
            };
            scope.paginate = function (value) {
                var begin, end, index;
                begin = (scope.currentPage - 1) * scope.numPerPage;
                end = begin + scope.numPerPage;
                index = scope.items.indexOf(value);
                return (begin <= index && index < end);
            };
        }
    }
});
