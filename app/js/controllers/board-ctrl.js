app.controller('boardCtrl', ['$scope', '$http', '$filter','urlWithoutParam','dbKey', function ($scope, $http, $filter, urlWithoutParam, dbKey) {
    $http.get(urlWithoutParam+'q={"status": "todo"}&'+dbKey)
        .success(function (data) {
            $scope.bugs = data;
        });
    $http.get(urlWithoutParam+'q={"status": "inprogress"}&'+dbKey )
        .success(function (data) {
            $scope.bugs_progress = data;
        });
    $http.get(urlWithoutParam+'q={"status": "resolved"}&'+dbKey)
        .success(function (data) {
            $scope.bugs_fixed = data;
        });
        $scope.deleteItem = function(){
            var url = 'https://api.mongolab.com/api/1/databases/bugsdemodb/collections/bugscollection?apiKey=aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs&q={"id":'+$routeParams.bugId+'}';
            console.log('')

        };

    /*
        var log = [];
        angular.forEach(data, function (value, key) {
            this.push(key + ': ' + value);
        }, log);*/





}]);
