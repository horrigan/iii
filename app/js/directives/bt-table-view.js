app.directive('btTableCell', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            cell:'=cellData',
            buildCell:'&'
        },
        controller: function($scope){
            //console.log($scope.buildCell())
           // console.log($scope.cell)
        },
       // replace:true,
        link: function (scope, element, attrs, cell) {
            //scope.newBind = scope.buildCell()
            //console.log(scope.cell)

            //console.log(scope.buildCell)
            element.html(scope.buildCell())
            //scope.buildCell()
           // console.log(scope.newBind)

        },
        //template: '<div ng-bind-html="buildCell()"></div>'
        template: '<div ng-bind=" scope.buildCell()"></div>'

    }
});

app.directive('btTableView', function ($sce) {
    return {
        restrict: 'EA',
        scope: {
            items: '=data',
            th: '=th',
            template:'='
        },
        controller: function ($scope, $sce) {
            var template = $scope.template;

            $scope.buildTemplate = function (cell, i, tempateObj) {
                var args = Array.prototype.slice.call(arguments);
                //console.log(args)
                if (i == '_id') {
                    return tempateObj._id(cell, i)
                    // return template._id(cell)
                }
                if (i == 'trackedTimeArr') {
                    return template.trackedTimeArr(cell)
                }
                if(i =='createdDate'){
                    return template.createdDate(cell)
                }

                else {
                    return cell
                }
            }
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
                '<tr ng-repeat="(i, ticket) in items | filter: paginate | orderBy:header:reverseSort track by $index"  >' +
                    '<td ng-repeat="(i,cell) in ticket track by $index" >' +
                        '<div bt-table-cell cell-data="cell" build-cell="buildTemplate(cell, i, template)" ng-class="i"></div>' +
                    '<td>' +
                '</tr>' +
                '</tbody>' +

            '</table>' +
            ' <pagination total-items="totalItems" ng-model="currentPage" max-size="5" boundary-links="true" items-per-page="numPerPage" class="pagination-sm"></pagination>' +

            ' <div ng-transclude></div>' +
            '  </div>',
        transclude: true,
        link: function (scope, element, attrs) {
            //console.log(scope.buildTemplate)
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
                        console.log(columnName)
                    scope.checkValue = columnName
            };
            scope.hideColumns('id')
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
/*
$scope.buildTemplate = function (cell, i, tempateObj) {
    //var template = $scope.template;
    if (i == '_id') {
        return tempateObj._id(cell)
        // return template._id(cell)
    }
    if (i == 'trackedTimeArr') {
        return template.trackedTimeArr(cell)
    }
    else {
        return cell
    }
}*/
