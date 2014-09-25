app.factory('Ticket', function ($resource, constant, transformResponseMongo, transformResponseMongoGet, transformRequestMongo) {
    return $resource(constant.url,
        {  _id: "@Id", apiKey: constant.apiKey }, {
            update: {
                method: 'PUT',
                transformRequest:transformRequestMongo
            },
            get:{
                method: 'GET',
                isArray: false,
                transformResponse: transformResponseMongoGet
            },
            query:{
                method: 'GET',
                isArray: true,
                transformResponse: transformResponseMongo
            }

        }
    );
});


