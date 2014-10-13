angular.module('bugtracker').filter('reorderFilter', function () {
    function move (old_index, new_index) {
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
        return this;
    }
    return function (data, value) {
        move.call(data ,0, value);
        return data
    };
});
