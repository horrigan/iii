var app = angular.module('bugtracker', ['ui.router', "ngResource", "ngRoute", 'ui.bootstrap', 'ngDragDrop' ]);
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
        .state('table-view', {
            url: '/table-view',
            templateUrl: 'templates/views/table-view.html',
            controller: 'TableCtrl',
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

app.controller('AddAuthorCtrl', function ($scope, $http, $state, $stateParams, Author) {
    $scope.postAuthorToDb = function (author) {
        Author.save(author).$promise.then(function () {
            $state.go('board')
        })
    }
});

app.controller('AddTicketCtrl', function ($scope, $http, $state, $stateParams, Ticket, limitToFilter, constant, Author) {
    $scope.getAuthors = function (val) {
        return Author.search({q: JSON.stringify({name: {'$regex': val}})}).$promise.then(function (result) {
            var namesArr = [];
            angular.forEach(result, function (value) {
                this.push(value.name + ' ' + value.surname);
            }, namesArr);
            return namesArr
        })
    };
    $scope.ticket = {
        createdDate: new Date(),
        status: 'todo',
        comments: [],
        trackedTimeArr: []
    };
    $scope.postTicketToDb = function (ticket) {
        Ticket.query({s: {"id": -1}, l: 1}).$promise
            .then(function (data) {
                ticket.id = data.length ? data[0].id + 1 : 1;
                Ticket.save(ticket).$promise
                    .then(function () {
                        $state.go('board')
                    })
            });
    };
});

app.controller('BoardCtrl', function ($scope, $http, tickets, Ticket, $state, $stateParams) {
        $scope.tickets = tickets;

        $scope.addCol = function (ticket) {
            $state.go('board.panel', { id: ticket._id })
        };
        $scope.statuses = ['todo', 'inprogress', 'resolved'];

        $scope.dropColumn = function (ticket, column) {
            angular.forEach($scope.tickets, function (item) {
                if (item.id === ticket.id) {
                    item.status = column;
                    Ticket.update({_id: item._id}, item).$promise.then(function () {
                        $state.transitionTo('board', $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    })
                }
            });
        };
    }
);

app.controller('EditTicketCtrl', function ($scope, $stateParams, $http, Ticket, $state, ticket) {
        $scope.ticket = ticket;
        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };



        $scope.edit = function (ticket) {
            Ticket.update({_id: ticket._id}, ticket).$promise
                .then(function () {
                    $state.transitionTo('board', $stateParams, { reload: true, inherit: false, notify: true })
                })
        };

        $scope.remove = function (ticket) {
            Ticket.delete({_id: ticket._id}).$promise
                .then(function () {
                    $state.transitionTo('board', $stateParams, { reload: true, inherit: false, notify: true })
                })
        };

        $scope.addComment = function (commentData) {
            commentData.date = new Date();
            ticket.comments.push(commentData);
            Ticket.update({_id: $stateParams.id}, ticket).$promise
                .then(function () {
                    $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
                });

        };

    }
);



app.controller('TableCtrl', function ($scope, tickets) {
    $scope.tickets = tickets;
    $scope.templateObj = {
        id:'<div ng-bind="cell"></div>',
        _id:'<div ><a ui-sref="edit-ticket({id: cell})">edit</a></div>',
        assignee: '<div ng-bind="cell"></div>',
        comments: '<div ng-repeat="cellValue in cell">Author:<div class="table-cell" ng-bind="cellValue.author"></div>Comment:<div class="table-cell" ng-bind="cellValue.comment"></div>Date:<div class="table-cell" ng-bind="cellValue.date | date:dd/MM/yyyy"></div>',
        createdDate:'<div ng-bind="cell | date:dd/MM/yyyy"></div>',
        trackedTimeArr:'<div ng-repeat="cellValue in cell"><div class="table-cell" ng-bind="cellValue.author"></div><div class="table-cell" ng-bind="cellValue.name"></div><div class="table-cell" ng-bind="cellValue.time | minuteFilter"></div></div>',
        priority: '<div ng-bind="cell"></div>',
        description: '<div ng-bind="cell"></div>',
        title: '<div ng-bind="cell"></div>',
        type: '<div ng-bind="cell"></div>',
        status: '<div ng-bind="cell"></div>'
    }
});

app.directive('modalDialog', function() {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true,
        transclude: true,
        link: function(scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;
            scope.hideModal = function() {
                scope.show = false;
            };
        },
        templateUrl: 'templates/partials/modal.html'
    };
});

app.directive('btTableCell', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            cell: '=cellData',
            buildCell: '&'
        },
        replace: true,
        link: function (scope, element, attrs) {
            element.html(scope.buildCell());
            $compile(element.contents())(scope);
        },
        template: '<div></div>'
    }
});

app.directive('btTableView', function () {
    return {
        restrict: 'EA',
        scope: {
            items: '=data',
            template: '='
        },
        templateUrl: 'templates/partials/table.html',
        transclude: true,
        link: function (scope, element, attrs) {
            var columnsHeaders = [];
            angular.forEach(scope.items[0], function (value, key) {
                this.push({colName: key, valid: true});
            }, columnsHeaders);
            scope.columnsHeaders = columnsHeaders;

            var selectedArray = [];
            scope.selected = function (column) {
                if (selectedArray.indexOf(column) != -1) {
                    var index = selectedArray.indexOf(column);
                    if (index > -1) {
                        selectedArray.splice(index, 1);
                    }
                } else {
                    selectedArray.push(column)
                }
                scope.selectedColumns = selectedArray;
            };

            scope.orderByField = 'id';
            scope.reverseSort = false;
            scope.order = function (predicate, reverse) {
                scope.header = predicate;
                scope.reverseSort = reverse
            };
            scope.order('-id', false);
            scope.totalItems = scope.items.length;
            scope.currentPage = 1;
            scope.numPerPage = 5;

            scope.setPage = function (pageNo) {
                scope.currentPage = pageNo;
            };
            scope.paginate = function (value) {
                var begin, end, index;
                begin = (scope.currentPage - 1) * scope.numPerPage;
                end = begin + scope.numPerPage;
                index = scope.items.indexOf(value);
                return (begin <= index && index < end);
            };
        }
    }
});

app.directive('btTicket', function () {
    return {
        restrict: 'A',
        templateUrl: 'templates/partials/ticket.html'
    }
});

app.directive('btTimeTracker', function(Ticket,$stateParams,$state) {
    return {
        restrict: 'EA',
        scope: {
            ticket: '=data'

        },
        replace: true,
        templateUrl:'templates/partials/time-tracker.html',

        link: function(scope, element, attrs) {

            scope.trackedData = {};
            scope.trackedTime = '';
            scope.totalTime = function (trackedTime) {
                var dateObj = {
                    days: parseInt(trackedTime.match(/ *(\d+)([d])/gm) || 0),
                    hours: parseInt(trackedTime.match(/ *(\d+)([h])/gm) || 0),
                    min: parseInt(trackedTime.match(/ *(\d+)([m])/gm) || 0)
            };
                var allMin = (dateObj.days * 60  * 8) + (dateObj.hours  * 60) + (dateObj.min);
                var days = parseInt(allMin / (60  * 8));
                var hours = parseInt((allMin - (days * 60 * 8)) / (60 ));
                var min = parseInt((allMin - ((days * 60  * 8) + (hours * 60 ))));
                scope.trackedData.time = allMin;
                return days + ' days ' + hours + ' hours ' + min + ' min '

            };
            scope.trackedData.author = scope.ticket.assignee;
            scope.trackedData.date = new Date();

            scope.addTrackedTime = function (ticket) {
                ticket.trackedTimeArr.push(scope.trackedData);
                Ticket.update({_id: ticket._id}, ticket).$promise
                    .then(function () {
                        $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
                    });
            };

        }
    };
});


app.filter('minuteFilter', function () {
    return function (minutes, filterParam) {
        switch(filterParam){
            case 'days':
                return parseInt((minutes / 60)/8 ) + ' days';
            case 'hours':
                return parseInt((minutes /60)) + ' hours';
            case 'minutes':
                return minutes +  ' minutes';
            default:
                var days = parseInt(minutes / (60  * 8));
                var hours = parseInt((minutes - (days * 60 * 8)) / (60 ));
                var min = parseInt((minutes - ((days * 60  * 8) + (hours * 60 ))));
                return days + ' days ' + hours + ' hours ' + min + ' min '
        }
    };
});

app.filter('reorderFilter', function () {
    return function (data, value) {
        Array.prototype.move = function (old_index, new_index) {
            if (new_index >= this.length) {
                var k = new_index - this.length;
                while ((k--) + 1) {
                    this.push(undefined);
                }
            }
            this.splice(new_index, 0, this.splice(old_index, 1)[0]);
            return this;
        };
        data.move(0, value);
        return data
    };
});

app.factory('Author', function ($resource, constant, transformMongoService) {
    return $resource(constant.authorUrl,
        {  _id: "@Id", apiKey: constant.apiKey}, {
            get: {
                method: 'GET',
                isArray: true,
                transformResponse: transformMongoService.transformResponseGet
            },
            search: {
                method: 'GET',
                isArray: 'true',
                params: {q: ':@q'},
                url: constant.authorUrl,
                transformResponse: transformMongoService.transformResponse
            }

        }
    );
});

app.constant('constant', {
    url: 'https://api.mongolab.com/api/1/databases/bugsdemodb/collections/bugscollection/:_id',
    authorUrl:'https://api.mongolab.com/api/1/databases/bugsdemodb/collections/authors/:_id',
    apiKey:'aQulivByDLdq_F1mhTgUSXG4eYLJJ8rs'
});

app.factory('Ticket', function ($resource, constant, transformMongoService) {
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



app.service('transformMongoService', function(){
    return {
        transformRequest:  function(data) {
            delete data._id;
            return angular.toJson(data)
        },
        transformResponseGet:  function(data) {
            var newData = angular.fromJson(data);
            newData._id = newData._id.$oid;
            return newData
        },
        transformResponse  : function (data) {
            var newData = angular.fromJson(data);
            var transformedArray = [];
            angular.forEach(newData, function (value) {
                value._id = value._id.$oid;
                this.push(value);
            }, transformedArray);
            return transformedArray

        }
    }
});