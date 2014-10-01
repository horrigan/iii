app.directive('btTableView', function ($filter) {
    /*'<td><a ui-sref="edit-ticket({id: ticket._id})">{{ticket.id}}</a></td>' +
     '<td>{{ticket.status}}</td>' +
     '<td>{{ticket.type}}</td>' +
     '<td>{{ticket.assignee}}</td>' +
     '<td>{{ticket.createdDate | date: "dd/MM/yyyy"}}</td>' +*/
    /* scope.columns = [];
     angular.forEach(scope.items, function(value, key) {
     console.log('/')
     angular.forEach(value, function(value, key){
     console.log(value, key)
     this.push(value)
     })
     }, scope.columns);*/
    return {
        restrict: 'EA',
        scope: {
            items: '=data',
            temp:'=temp'
        },
        template: '<div>' +
            '<table>' +
                '<thead>' +
                    '<tr>' +
                        '<th ng-repeat="header in columnsHeaders">' +
                            '<a ng-click="reverse=!reverse;order(header,reverse)">{{header}}</a>' +
                        '</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr ng-repeat="ticket in items | filter: paginate  track by $index">' +
                    '<td ng-repeat="cell in ticket track by $index">' +
                        '<div temp="ticket">{{cell}}</div>' +
                    '<td>' +
                '</tr>' +
                '</tbody>' +

            '</table>' +
            ' <pagination total-items="totalItems" ng-model="currentPage" max-size="5" boundary-links="true" items-per-page="numPerPage" class="pagination-sm"></pagination>' +

            ' <div ng-transclude></div>' +
            '  </div>',
        transclude: true,
        link: function (scope, element, attrs) {
            /*console.log('attr',attrs);
            console.log('element',element);
            console.log(scope.items);*/
            scope.orderByField = 'firstName';
            scope.reverseSort = false;
            var columnsHeaders = [];
            angular.forEach(scope.items[0], function(value, key) {
                this.push(key);
            }, columnsHeaders);
            scope.columnsHeaders = columnsHeaders.sort();

            var orderBy = $filter('orderBy');
            scope.order = function (predicate, reverse) {
                scope.items = orderBy(scope.items, predicate, reverse);
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
