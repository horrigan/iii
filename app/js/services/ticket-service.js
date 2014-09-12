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
