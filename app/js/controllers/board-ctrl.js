app.controller('boardCtrl', ['$scope', '$http', '$filter','bugResourceAll', function ($scope, $http, $filter, bugResourceAll ) {
    var bugsBoard = bugResourceAll.query();
    bugsBoard.$promise.then(
        function (result) {
            $scope.bugs = result;
        }
    );
}

]);
app.controller('dndCtrl', function($scope){

});

app.directive('newBugs', function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partials/mybug.html'
    }
});
