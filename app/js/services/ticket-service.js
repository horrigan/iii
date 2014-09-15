app.constant('myDbUrl', 'https://api.mongolab.com/api/1/databases/bugsdemodb/collections/bugscollection?apiKey=aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs');
app.constant('urlWithoutParam','https://api.mongolab.com/api/1/databases/bugsdemodb/collections/bugscollection?');
app.constant('dbKey','apiKey=aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs')

app.factory('bugResourceAll', ['$resource','$stateParams','myDbUrl', function($resource,$stateParams, myDbUrl) {

    return $resource(myDbUrl,{}, {


        query: {method:'GET', params:{entryId:''}, isArray:true},
        post: {method:'POST'},
        update: {method:'PUT', params: {entryId: '@entryId'}},
        remove: {method:'DELETE'}
    })

}]);


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
        return $resource(myDbUrl, {}, {
            update: {
                method:'PUT',
                params: {}
            }
        })
    }]);

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
