app.controller('newTicketCtrl', ['$scope', '$http', '$location','$routeParams','url', function ($scope, $http, $location, $routeParams, url) {
    $scope.bugId = $routeParams.bugId;
    $http.get(url).success(function (data) {
        $scope.bugs = data;
        $scope.newId = data.length + 1;
    });
    $scope.status = 'todo';
    $scope.date = new Date();

    $scope.PostBugToDb = function () {
        var data = {
            id: $scope.newId,
            title: $scope.title,
            description: $scope.description,
            type: $scope.type,
            status: $scope.status,
            priority: $scope.priority,
            assignee: $scope.assignee,
            createdDate: $scope.createdDate,
            updateDate: '',
            resolvedDate: '',
            comments: []
        };
        var urlPost = url;

        $http.post(urlPost, data).success(function (data) {
            $location.path('/')
        })
    };

}]);
