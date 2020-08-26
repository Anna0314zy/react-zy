function times(cb, length) {
    var count = 0;
    return function() {
     if (++count === length) {
         cb();
     }
    }
}
let newfn = times(() => {console.log('333')}, 3);
newfn();
newfn();
newfn();