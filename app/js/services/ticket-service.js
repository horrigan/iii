app.constant('url', 'https://api.mongolab.com/api/1/databases/bugsdemodb/collections/bugscollection?apiKey=aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs');
app.constant('urlWithoutParam','https://api.mongolab.com/api/1/databases/bugsdemodb/collections/bugscollection?');
app.constant('dbKey','apiKey=aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs')
app.factory('bugResource', ['$resource','$routeParams','url', function($resource,$routeParams,url) {

    return $resource(url,{}, {


        query: {method:'GET', params:{entryId:''}, isArray:true},
        post: {method:'POST'},
        update: {method:'PUT', params: {entryId: '@entryId'}},
        remove: {method:'DELETE'}
    })

}]);
/*
 'use strict';
 app.factory('bugService', function (bugResource) {
 // Mock
 var issues = bugResource.query();
 function query() {
 //return issues
 return issues;
 }
 // Mock
 function get(issueId) {
 return issues[0];
 }
 // Mock
 function save(issue) {
 console.log("POST new issue: " + issue);
 issues.push(issue);
 //return future from resource;
 };
 // Mock
 function edit(issue) {
 issues[0] = issue
 }
 // Public APIs
 return {
 query: query,
 get: get,
 save: save,
 edit: edit
 };
 });*/

