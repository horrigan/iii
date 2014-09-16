angular.module('app.directives.newBug', [])
    .directive('newBugs', function () {
        return {
            restrict: 'A',
            templateUrl: 'templates/partials/mybug.html',
            controller: function ($scope){
                console.log($scope.data)
            }
          /* scope: {
               data: '='
            }*/
        }
})
;
