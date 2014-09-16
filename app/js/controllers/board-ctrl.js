app.controller('boardCtrl', ['$scope', '$http', '$filter', 'bugResourceAll', function ($scope, $http, $filter, bugResourceAll) {
    var bugsBoard = bugResourceAll.query();
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





