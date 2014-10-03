app.directive('btTimeTracker', function(Ticket,$stateParams,$state) {
    return {
        restrict: 'EA',
        scope: {
            ticket: '=data'

        },
        replace: true,
        template:'<form name="trackTimeForm">'+
                     '<div class="trackedHead">Track your working time</div>'+
                         '<input class="trackedInp" placeholder="1d 12h 30m" data-ng-model="trackedTime"/>'+
                     '<div class="trackedVal" data-ng-model="ticket.trackedCurrTask" ng-bind="totalTime(trackedTime)"></div>'+

                     '<div data="ticket" class="trackedControls">'+
                         '<input value="submit" class="btn btn-primary" ng-click="addTrackedTime(ticket)" ng-disabled="trackTimeForm.$invalid"/>'+
                     '</div>'+
                 '</form>',

        link: function(scope, element, attrs) {

            scope.trackedData = {};
            scope.trackedTime = '1h 30m';
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

