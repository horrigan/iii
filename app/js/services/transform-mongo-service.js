app.factory('transformResponseMongo', function(){
    return function(data){
        var newData = angular.fromJson(data);
        newData._id = newData._id.$oid;
        return newData
    }
});