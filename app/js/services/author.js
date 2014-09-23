app.factory('Author', function ($resource, constant) {
    return $resource(constant.authorUrl,
        {  _id: "@Id", apiKey: constant.apiKey, callback:"JSON_CALLBACK" }, {
            get:{
                method: 'GET',
                isArray: true
            }
        }
    );
});
