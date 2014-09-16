app.controller('BugDetailCtrl', ['$scope', '$stateParams', '$http', '$resource', 'bugResource',  '$location','bugResourceAll','bugResourceEdit',
    function ($scope, $stateParams, $http, $resource, bugResource,  $location, bugResourceAll,bugResourceEdit) {
        var id = $stateParams.id;
        $scope.updateDate = new Date();
        var butToEdit = bugResource.query({q: '{' + '"id":' + id + '' + '}'});
        butToEdit.$promise.then(
            function (result) {
                $scope.edit_bug = result[0];
               // $scope.edit = function (edit_bug) {
                  // var editted_bug = bugResourceAll.update({q: '{' + '"_id":' + '"' + result[0]._id['$oid'] + '"'+ '}'},edit_bug);
                  // var editted_bug = bugResourceEdit.update({ '':result[0]._id['$oid']},edit_bug)
               // };
            }
        );

        //$scope.edit = function (edit_bug) {
            //var editted_bug = bugResourceAll.update({q: '{' + '"id":' + id + '' + '}'},edit_bug);
           // var editted = bugResourceEdit.update(edit_bug)
       // };

        $scope.addReview = function (ticket) {
            $scope.comments = {};
            console.log(ticket);
            var commentData = {
                comment_author: $scope.ticket.comment_author,
                comment_body: $scope.ticket.comment,
                comment_time: $scope.updateDate
            };
            this.comments.push(ticket);
            var sendedData = {
                author: commentData.comment_author,
                comment: commentData.comment_body,
                date: commentData.comment_time
            };
        };


    }]);




