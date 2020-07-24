//高阶 把函数传给一个函数 返回一个新函数
//函数可以作为方法的参数或者返回值
function calcuate(fn) {
    return function(a,b) {
        return fn(a,b);
    }
}
function sum(a, b){
    return a + b;
}
let newFunc = calcuate(sum);
let res = newFunc(2, 3);
console.log(res);