function add1(str) {
    return '1'+str;
}
function add2(str) {
    return '2'+str;
}
function add3(str) {
    return '3'+str;
}
function compose(...funcs) {
    if (funcs.length === 0) return args => args;
    if (funcs.length ===1) {
        return funcs[0];
    }
    return funcs.reduce((func, next)=>(...args) => func(next(...args)));
}
let result = compose(add1, add2, add3)('zhufeng');
console.log(result); 
// export default compose;
//123zhufeng
