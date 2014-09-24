app.factory('Author', function ($resource, constant) {
    return $resource(constant.authorUrl,
        {  _id: "@Id", apiKey: constant.apiKey}, {
            get:{
                method: 'GET',
                isArray: true
            },
            search:{method:'GET', isArray:'true', params:{q:':@q'}, url: constant.authorUrl}
        }
    );
});
