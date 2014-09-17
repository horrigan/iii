var app = angular.module('bugtracker', ['ui.router','mongolab', "ngResource", "ngRoute", 'ngDragDrop', 'app.directives.newBug' ]);
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '',
            templateUrl: 'templates/views/board.html',
            controller: 'boardCtrl'
        })
        .state('new', {
            url: '/new/',
            templateUrl: 'templates/views/add-new-ticket.html',
            controller: 'newTicketCtrl'
        })
        .state('bug', {
            url: '/bug/:id',
            templateUrl: 'templates/views/edit-ticket.html',
            controller: 'BugDetailCtrl'
        })

});
