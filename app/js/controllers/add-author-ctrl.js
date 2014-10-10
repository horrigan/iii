angular.module('bugtracker').controller('AddAuthorCtrl', function ($scope, $http, $state, $stateParams, Author) {
    $scope.postAuthorToDb = function (author) {
        Author.save(author).$promise.then(function () {
            $state.go('board')
        })
    }
});
