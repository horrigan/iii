/**
 * Created by denis.azaare on 15.09.2014.
 */


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


 // var url = 'https://api.mongolab.com/api/1/databases/bugsdemodb/collections/bugscollection?apiKey=aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs&q={"id":'+$routeParams.bugId+'}';

 $http.put(url, sendedData).success(function (sendedData) {
 $scope.putData = sendedData;
 console.log($scope.putData)
 })
 };


 */


/*
 app.factory('bugResource', ['$resource',
 function($resource) {
 var res = $resource('https://api.mongolab.com/api/1/databases/bugsdemodb/collections/bugscollection?q={"id":'+3+'}&apiKey=aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs', {}, {
 get: {
 method: 'GET',
 params: {
 entryId
 },
 isArray: true

 }

 });
 return res;
 }
 ]);

 */
