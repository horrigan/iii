app.directive('btTableCell', function ($compile, $interpolate) {
    return {
        restrict: 'A',
        scope: {
            cell: '=cellData',
            buildCell: '&'

        },
        replace: true,
        link: function (scope, element, attrs) {
            //console.log($interpolate(scope.buildCell()))
          /*  scope.$watch(attrs.cellData, function(html) {
                var a = $interpolate(scope.buildCell());
                console.log(a({cell: scope.cell}))
                element.html(a({cell: scope.cell}));

                $compile(element.contents())(scope);
                scope.$apply()
            });*/

           // var a = $interpolate(scope.buildCell())
            var content = $interpolate(scope.buildCell())(scope)

            element.html(content)
            $compile(element.contents())(scope);

           //console.log($interpolate(scope.buildCell((scope.cell))))
           //element.html(scope.buildCell())
            /*
            var content = $compile('<div>Hello {{name}}</div>')(scope);
            element.append(content);
            scope.$apply();
            */
        },
        template: '<div></div>'
    }
});
