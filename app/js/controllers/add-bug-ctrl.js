app.controller('newTicketCtrl', ['$scope', '$http', '$location', '$stateParams', 'bugResourceAll', 'PostToDB',
    function ($scope, $http, $location, $stateParams, bugResourceAll, PostToDB) {
        $scope.date = new Date();
        $scope.status = 'todo';
        var bugNum = bugResourceAll.query();
        bugNum.$promise.then(
            function (data) {
                $scope.newbug = data;
                $scope.newId = data.length + 1

            }
        );
        $scope.PostBugToDb = function () {
            var newpost = PostToDB.post({
                id: $scope.newId,
                title: $scope.title,
                description: $scope.description,
                type: $scope.type,
                status: $scope.status,
                priority: $scope.priority,
                assignee: $scope.assignee,
                createdDate: $scope.date,
                updateDate: '',
                resolvedDate: '',
                comments: []
            });
            $location.path('/')
};

