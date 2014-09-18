var app = angular.module('bugtracker', ['ui.router', "ngResource", "ngRoute" ]);
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '',
            templateUrl: 'templates/views/board.html',
            controller: 'BoardCtrl'
        })
        .state('new', {
            url: '/new/',
            templateUrl: 'templates/views/add-new-ticket.html',
            controller: 'AddNewTicket'
        })
        .state('bug', {
            url: '/bug/:id',
            templateUrl: 'templates/views/edit-ticket.html',
            controller: 'EditTicketCtrl'
        });
});
