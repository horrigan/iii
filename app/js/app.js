var app = angular.module('bugtracker', ['ui.router', "ngResource","ngRoute" ] );

app.config(function ($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home',{
            url: '/',
            templateUrl:'templates/views/board.html',
            controller: 'boardCtrl'
        })
        .state('new',{
            url: '/new/',
            templateUrl:'templates/views/add-new-ticket.html',
            controller: 'newTicketCtrl'
        })
        .state('bug',{
            url: '/bug/:id',
            templateUrl:'templates/views/edit-ticket.html',
            controller: 'BugDetailCtrl'
        })

});


/*
app.factory('bugResource', ['$resource',
    function($resource) {
        var res = $resource('https://api.mongolab.com/api/1/databases/bugsdemodb/collections/bugscollection?q={"id":'+3+'}&apiKey=aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs', {}, {
            get: {
                method: 'GET',
                params: {
                    entryId
                },
                isArray: true

            }

        });
        return res;
    }
]);

 */

app.directive('newBugs', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/partials/mybug.html'
    }
});
/*
app.directive('processBugs', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/partials/mybug.html'
    }
});
app.directive('fixedBugs', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/partials/mybug.html'
    }
});

*/