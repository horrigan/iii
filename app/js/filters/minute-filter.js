angular.module('bugtracker').filter('minuteFilter', function () {
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
