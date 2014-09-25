app.service('transformResponseMongo', function () {
    return function (data) {
        var newData = angular.fromJson(data);
        var transformedArray = [];
        angular.forEach(newData, function (value) {
            value._id = value._id.$oid;
            this.push(value);
        }, transformedArray);
        return transformedArray

    }
});
app.service('transformResponseMongoGet', function () {
    return function (data) {
        var newData = angular.fromJson(data);
        newData._id = newData._id.$oid;
        return newData

    }
});
app.service('transformRequestMongo', function () {
    return function (data) {
        delete data._id;
        return angular.toJson(data)
    }
})