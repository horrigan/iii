app.factory('Ticket', function ($resource, constant) {
    return $resource(constant.url,
        {  _id: "@Id", apiKey: constant.apiKey }, {
            update: {
                method: 'PUT',
                transformRequest:function(data){
                    delete data._id;
                    delete data.$promise;
                    delete data.$resolved;
                    return JSON.stringify(data)
                }
            },
            get:{
                method: 'GET',
                isArray: false
            }
        }
    );
});


