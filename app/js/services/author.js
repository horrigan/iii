app.factory('Author', function ($resource, constant, transformMongoService) {
    return $resource(constant.authorUrl,
        {  _id: "@Id", apiKey: constant.apiKey}, {
            get: {
                method: 'GET',
                isArray: true,
                transformResponse: transformMongoService.transformResponseGet
            },
            search: {
                method: 'GET',
                isArray: 'true',
                params: {q: ':@q'},
                url: constant.authorUrl,
                transformResponse: transformMongoService.transformResponse
            }

        }
    );
});
