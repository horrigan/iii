var app = angular.module('bugtracker', ['ui.router', "ngResource", "ngRoute" ]);
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '',
            templateUrl: 'templates/views/board.html',
            controller: 'BoardCtrl',
            resolve: {
                promiseBoardObj: function ($http, Ticket) {
                    return Ticket.query().$promise
                }
            }
        })
        .state('new', {
            url: '/new/',
            templateUrl: 'templates/views/add-new-ticket.html',
            controller: 'AddTicketCtrl',
            resolve: {
                promiseNewObj: function ($http, Ticket) {
                    return Ticket.query().$promise
                }
            }
        }
    )
        .state('bug', {
            url: '/bug/:id',
            templateUrl: 'templates/views/edit-ticket.html',
            controller: 'EditTicketCtrl',
            resolve: {
                promiseEditObj: function ($http, Ticket, $stateParams) {
                    return Ticket.get({_id: $stateParams.id}).$promise
                }
            }
        })
});
