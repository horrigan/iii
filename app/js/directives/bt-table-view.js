app.directive('btTableCell', function () {
    return {
        restrict: 'A',
        scope: {
            cell: '=cellData',
            buildCell: '&'

        },
        replace: true,
        link: function (scope, element, attrs) {
            element.html(scope.buildCell())
        },
        template: '<div></div>'
    }
});

app.directive('btTableView', function () {
    return {
        restrict: 'EA',
        scope: {
            items: '=data',
            th: '=th',
            template: '='
        },
        controller: function ($scope) {
            var template = $scope.template;
            $scope.buildTemplate = function (cell, i) {
                if (i == '_id') {
                    return template._id(cell, i)
                }
                if (i == 'trackedTimeArr') {
                    return template.trackedTimeArr(cell)
                }
                if (i == 'createdDate') {
                    return template.createdDate(cell)
                } else {
                    return cell
                }
            }
        },
        template: '<div>' +
            '<table>' +
            '<thead>' +

            '<th ng-repeat="(i,tableHeader) in th track by $index">' +
            '<div class="btn"  ng-click="hide=!hide; hideColumns(tableHeader,hide)">Hide column</div>' +
            '</th>' +
            '<tr>' +
            '<th ng-repeat="tableHeader in th track by $index" >' +
            '<a ng-click="reverse=!reverse;order(tableHeader,reverse)">{{tableHeader}}</a>' +
            '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr ng-repeat="(i, ticket) in items | filter: paginate | orderBy:header:reverseSort track by $index"  >' +
            '<td ng-repeat="(i,cell) in ticket track by $index" >' +
            '<div bt-table-cell cell-data="cell" build-cell="buildTemplate(cell, i, template)" ng-class="i" ng-hide="(checkCol == i)"></div>' +
            '<td>' +

            '</tr>' +
            '<td><input type="number" ng-model="numPerPage"/>{{numPerPage}} tickets per page </td>' +
            '</tbody>' +

            '</table>' +
            ' <pagination total-items="totalItems" ng-model="currentPage" max-size="5" boundary-links="true" items-per-page="numPerPage" class="pagination-sm"></pagination>' +

            ' <div ng-transclude></div>' +
            '  </div>',
        transclude: true,
        link: function (scope, element, attrs) {
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
            scope.hideColumns = function (columnName, hideStatus) {
                scope.checkCol = hideStatus ? columnName : false
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
