app.factory('Ticket', function ($resource, Constant) {
    return $resource(Constant.url,
        {  _id: "@Id", apiKey: Constant.apiKey }, {
            update: {
                method: 'PUT',
                transformRequest:function(data){
                    delete data._id;
                    return JSON.stringify(data)
                }
            },
            get:{
                method: 'GET',
                isArray: true
            }
        }
    );
});


