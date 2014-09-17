app.controller('newTicketCtrl', ['$scope', '$http', '$state', '$stateParams', 'BugsResource', '$filter',
    function ($scope, $http, $state, $stateParams, BugsResource, $filter) {
        $scope.date = new Date();
        $scope.today = $filter('date')(new Date(), 'dd-MM-yyyy');
        $scope.status = 'todo';
        var bugNum = BugsResource.query().$promise.then(
            function (data) {
                $scope.newbug = data;
                $scope.newId = data.length + 1
            }
        );
        $scope.PostBugToDb = function (bug) {
            bug.date = $scope.date;
            bug.status = 'todo';
            bug.id = $scope.newId;
            var newpost = BugsResource.save(bug).$promise
                .then($state.go('home')
            )
        };
    }]);
/*

 */