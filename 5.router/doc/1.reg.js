let {pathToRegexp}= require('path-to-regexp');//把路由转换成正则 的库
console.log(pathToRegexp);
let regexp = pathToRegexp('/home', [], {end:false});
console.log(regexp) ///^\/home[\/#\?]?$/i
//   /^\/home(?:\/)?$/i  ?:非捕获分组
let reg2 = /^\/home(?:\/)?$/i;
// let reg2 = /^\/home[\/#\?]?$/i;
let url = '/home/';
let result = url.match(reg2);
console.log(result);
