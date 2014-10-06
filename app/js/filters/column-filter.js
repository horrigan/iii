app.filter('columnFilter', function () {
    return function (column, filterParam) {
        //console.log(column)
        Array.prototype.move = function (old_index, new_index) {
            if (new_index >= this.length) {
                var k = new_index - this.length;
                while ((k--) + 1) {
                    this.push(undefined);
                }
            }
            this.splice(new_index, 0, this.splice(old_index, 1)[0]);
            return this; // for testing purposes
        };
        if(column[0]){
          //  console.log(column)
        }
      //  console.table(column);


        //console.log(column.reverse())
        return column
    };
});
