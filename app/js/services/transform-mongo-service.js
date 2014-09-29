app.service('transformMongoService', function(){
    return {
        transformRequest:  function(data) {
            delete data._id;
            return angular.toJson(data)
        },
        transformResponseGet:  function(data) {
            var newData = angular.fromJson(data);
            newData._id = newData._id.$oid;
            return newData
        },
        transformResponse  : function (data) {
            var newData = angular.fromJson(data);
            var transformedArray = [];
            angular.forEach(newData, function (value) {
                value._id = value._id.$oid;
                this.push(value);
            }, transformedArray);
            return transformedArray

        }
    }
});