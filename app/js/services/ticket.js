app.factory('Ticket', function ($resource, constant, transformResponseMongo) {
    return $resource(constant.url,
        {  _id: "@Id", apiKey: constant.apiKey }, {
            update: {
                method: 'PUT',
                transformRequest:function(data){
                    delete data._id;
                    return angular.toJson(data)
                }
            },
            get:{
                method: 'GET',
                isArray: false,
                transformResponse: transformResponseMongo
            }}
    );
});


