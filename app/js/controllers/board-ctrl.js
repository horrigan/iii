app.controller('boardCtrl', ['$scope', '$http', '$filter', 'BugsResource', function ($scope, $http, $filter, BugsResource) {
    var bugsBoard = BugsResource.query();
    bugsBoard.$promise.then(
        function (result) {
            $scope.bugs = result;
        }
    );
    $scope.dropSuccessHandler = function ($event, index, array) {

        console.log($event);
        console.log(index);
        console.log(array);
        array.splice(index, 1);
    };

    $scope.onDrop = function ($event, $data, array) {

        bugsArray.push($event);
        console.log($data);
        console.log(array);
        // console.log(array)
    };

}
]);





