app.controller('BugDetailCtrl', ['$scope', '$routeParams', '$http','$resource', 'bugResource',
    function ($scope, $routeParams, $http, $resource , bugResource) {
     //   console.log($resource.query)
       // var Bug = $resource('https://api.mongolab.com/api/1/databases/bugsdemodb/collections/bugscollection?apiKey=aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs');

        var request = bugResource.query()
        console.log(request)
       // var bugs = Bug.query({id:['0'].id})

      //  console.log( bugs['f'].id)

      //  console.log(bug[{'id'}])
      //  $scope.bugId = $routeParams.bugId;

       // console.log($scope.bug)
       // console.log(typeof( $scope.bug))
/*
        $http.get('https://api.mongolab.com/api/1/databases/bugsdemodb/collections/bugscollection?q={"id":'+$routeParams.bugId+'}&apiKey=aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs')
            .success(function (data) {

            $scope.edit_bug = data;

            $scope.title = $scope.edit_bug[0].title;
            $scope.desc = $scope.edit_bug[0].description;
            $scope.type = $scope.edit_bug[0].type;
            $scope.priority = $scope.edit_bug[0].priority;
            $scope.assignee = $scope.edit_bug[0].assignee;
            $scope.createdDate = $scope.edit_bug[0].createdDate;
            $scope.updateDate = $scope.edit_bug[0].updateDate;
            $scope.resolvedDate = $scope.edit_bug[0].resolvedDate;
            $scope.comments = $scope.edit_bug[0].comments;
            $scope.status = $scope.edit_bug[0].status;
            });
            $scope.addReview = function () {
                var commentData = {
                    comment_author: $scope.ticket.comment_author,
                    comment_body: $scope.ticket.comment,
                    comment_time : '10/09/2014'
                };
                this.comments.push({
                    author:commentData.comment_author,
                    comment:commentData.comment_body,
                    date:commentData.comment_time

                });
                var sendedData = {
                    author:commentData.comment_author,
                    comment: commentData.comment_body,
                    date: commentData.comment_time
                };

               // var url = 'https://api.mongolab.com/api/1/databases/bugsdemodb/collections/bugscollection?apiKey=aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs&q={"id":'+$routeParams.bugId+'}';

                $http.put(url, sendedData).success(function (sendedData) {
                    $scope.putData = sendedData;
                    console.log($scope.putData)
                })
            };


*/

    }]);




