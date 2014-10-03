app.directive('btTableView', function () {
    return {
        restrict: 'EA',
        scope: {
            items: '=data',
            th:'=th'
        },
        template: '<div>' +
            '<table>' +
                '<thead>' +
                    '<th ng-repeat="(i,header) in th">' +
                        '<input type="checkbox" ng-click="hideColumns(columnName)">{{header}}' +
                    '</th>' +
                    '<tr>' +
                        '<th ng-repeat="header in th" >' +
                            '<a ng-click="reverse=!reverse;order(header,reverse)">{{header}}</a>' +
                        '</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr ng-repeat="(i, ticket) in items | filter: paginate | orderBy:header:reverseSort track by $index" >' +
                    '<td ng-repeat="cell in ticket track by $index" >' +
                        '<div >{{cell}}</div>' +
                    '<td>' +
                '</tr>' +
                '</tbody>' +

            '</table>' +
            ' <pagination total-items="totalItems" ng-model="currentPage" max-size="5" boundary-links="true" items-per-page="numPerPage" class="pagination-sm"></pagination>' +

            ' <div ng-transclude></div>' +
            '  </div>',
        transclude: true,
        link: function (scope, element, attrs) {
            scope.orderByField = 'firstName';
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
            //ng-show="(checkValue == {{i}})"
            scope.hideColumns = function(columnName){
                    scope.checkValue = columnName
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
