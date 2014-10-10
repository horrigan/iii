angular.module('bugtracker').factory('Ticket', function ($resource, constant, transformMongoService) {
    return $resource(constant.url,
        {  _id: "@Id", apiKey: constant.apiKey }, {
            update: {
                method: 'PUT',
                transformRequest:transformMongoService.transformRequest
            },
            get:{
                method: 'GET',
                isArray: false,
                transformResponse: transformMongoService.transformResponseGet
            },
            query:{
                method: 'GET',
                isArray: true,
                transformResponse: transformMongoService.transformResponse
            }

        }
    );
});


