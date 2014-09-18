app.controller('EditTicketCtrl', function ($scope, $stateParams, $http, Ticket, $state) {
        var myId = $stateParams.id;
        Ticket.get({id: myId}).$promise.
            then(function (result) {
                $scope.edit_bug = result;
                $scope.edit = function (edit_bug) {
                    delete edit_bug._id;
                    Ticket.update({id: myId}, edit_bug)
                };

                $scope.remove = function () {
                    Ticket.delete({id: myId}).$promise
                        .then($state.go('home'))
                };

                $scope.addReview = function () {
                    var commentData = {
                        comment_author: $scope.ticket.comment_author || 'Anonymous',
                        comment: $scope.ticket.comment || '',
                        comment_time: new Date()
                    };
                    $scope.edit_bug.comments.push(commentData);
                    delete $scope.edit_bug._id;
                    Ticket.update({id: myId}, $scope.edit_bug);

                }
            });
    }
);



