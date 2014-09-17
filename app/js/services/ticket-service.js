angular.module('mongolab', ['ngResource']).
    factory('BugsResource', function($resource) {
        var BugsResource = $resource('https://api.mongolab.com/api/1/databases' +
                '/bugsdemodb/collections/bugscollection/:_id',
            { apiKey: 'aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs' }, {
                update: { method: 'PUT' }
            }

        );
        BugsResource.prototype.update = function(cb) {
            return BugsResource.update({id: this._id.$oid},
                angular.extend({}, this, {_id:undefined}), cb);
        };

        BugsResource.prototype.destroy = function(cb) {
            return BugsResource.remove({id: this._id.$oid}, cb);
        };



        return BugsResource
    });


app.constant('myDbUrl', 'https://api.mongolab.com/api/1/databases/bugsdemodb/collections/bugscollection?apiKey=aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs');
/*
app.factory('bugResourceAll', ['$resource','myDbUrl', function($resource,myDbUrl) {

    return $resource(myDbUrl,{}, {
        query: {method:'GET', params:{entryId:''}, isArray:true},
        post: {method:'POST'},
        update: {method:'PUT', params: {entryId: '@entryId'}},
        remove: {method:'DELETE'}
    })

}]);*/
//https://api.mongolab.com/api/1/databases/bugsdemodb/collections/bugscollection?apiKey=aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs

/*
        Task.prototype.update = function(cb) {
            return Task.update({id: this._id.$oid},
                angular.extend({}, this, {_id:undefined}), cb);
        };

        Task.prototype.destroy = function(cb) {
            return Task.remove({id: this._id.$oid}, cb);
        };

        return Task;
    */
/*

app.factory('bugResource', ['$resource','myDbUrl',
    function($resource, myDbUrl){
        return $resource(myDbUrl+'/:bugId', {}, {
            query: {
                method:'GET',
                params:{},
                isArray:true}

        });

    }]);
app.factory('PostToDB', ['$resource','myDbUrl',
    function($resource, myDbUrl){
        return $resource(myDbUrl, {}, {
            post: {method:'POST'}
            })
    }]);
app.factory('bugResourceEdit', ['$resource','myDbUrl',
    function($resource, myDbUrl){
        return $resource(myDbUrl+'/:bugId', {}, {
            update: {
                method:'PUT',
                params: {}
            }
        })
    }]);
*/
/*
app.provider('Post', function() {
    this.$get = ['$resource','myDbUrl', function($resource,myDbUrl) {
        var Post = $resource(myDbUrl+'/:bugId', {}, {
            update: {
                method: 'PUT'
            }
        });

        return Post;
    }];
});*/
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

