app.factory('Ticket', function ($resource) {
    var Ticket = $resource('https://api.mongolab.com/api/1/databases' +
            '/bugsdemodb/collections/bugscollection/:id',
        {  _id: "@Id", apiKey: 'aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs' }, {
            update: { method: 'PUT' }
        }
    );
    return Ticket
});

