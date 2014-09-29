var app = angular.module('bugtracker', ['ui.router', "ngResource", "ngRoute", 'ui.bootstrap', 'ngDragDrop' ,'ngGrid' ]);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('board', {
            url: '/',
            templateUrl: 'templates/views/board.html',
            controller: 'BoardCtrl',
            resolve: {
                tickets: function (Ticket) {
                    return Ticket.query().$promise
                }
            }

        })
        .state('board.panel', {
            url: 'panel/:id',
            templateUrl: 'templates/views/edit-ticket.html',
            controller: 'EditTicketCtrl',
            resolve: {
                ticket: function (Ticket, $stateParams) {
                    return Ticket.get({_id: $stateParams.id}).$promise
                }
            }
        })
        .state('table-view',{
            url: '/table-view',
            templateUrl: 'templates/views/table-view.html',
            controller:'TableCtrl',
            resolve: {
                tickets: function (Ticket) {
                    return Ticket.query().$promise
                }
            }
        })
        .state('add-ticket', {
            url: '/add-ticket',
            templateUrl: 'templates/views/add-ticket.html',
            controller: 'AddTicketCtrl'
        })
        .state('add-author', {
            url: '/add-author',
            templateUrl: 'templates/views/add-author.html',
            controller: 'AddAuthorCtrl'
        })
        .state('edit-ticket', {
            url: '/edit-ticket/:id',
            templateUrl: 'templates/views/edit-ticket.html',
            controller: 'EditTicketCtrl',
            resolve: {
                ticket: function (Ticket, $stateParams) {
                    return Ticket.get({_id: $stateParams.id}).$promise
                }
            }
        })
});
