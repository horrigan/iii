app.directive('btTableCell', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            cell: '=cellData',
            buildCell: '&'
        },
        replace: true,
        link: function (scope, element, attrs) {
            element.html(scope.buildCell());
            $compile(element.contents())(scope);
        },
        template: '<div></div>'
    }
});
