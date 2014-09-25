app.factory('Author', function ($resource, constant, transformResponseMongo) {
    return $resource(constant.authorUrl,
        {  _id: "@Id", apiKey: constant.apiKey}, {
            get: {
                method: 'GET',
                isArray: true,
                transformResponse: transformResponseMongo
            },
            search: {
                method: 'GET',
                isArray: 'true',
                params: {q: ':@q'},
                url: constant.authorUrl,
                transformResponse: transformResponseMongo
            }

        }
    );
});
