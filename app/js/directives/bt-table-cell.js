app.directive('btTableCell', function ($compile, $interpolate) {
    return {
        restrict: 'A',
        scope: {
            cell: '=cellData',
            buildCell: '&'
        },
        replace: true,
        link: function (scope, element, attrs) {
            var content = $interpolate(scope.buildCell())(scope);
            element.html(content);
            $compile(element.contents())(scope);
        },
        template: '<div></div>'
    }
});
