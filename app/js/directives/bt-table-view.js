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
                if(template[i]){
                    return template[i]
                }return cell
            }
        },
        templateUrl:'templates/partials/table.html',
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
                scope.hide = hideStatus
                console.log(columnName, hideStatus)
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
