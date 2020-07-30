let {pathToRegexp}= require('path-to-regexp');//把路由转换成正则 的库
let paramNames = [];

let regexp = pathToRegexp('/user/:id/:name', paramNames, {end:false});
// console.log(paramNames)
paramNames = paramNames.map(item => item.name);
// console.log(regexp);
// console.log(paramNames);
let str = '/user/1/zhufeng/100'; //能匹配
console.log(str.match(regexp))
let [url, ...values] = str.match(regexp);
//url是匹配的字符串‘/user/1/zhufeng’
console.log(url, values); ///user/1/zhufeng [ '1', 'zhufeng' ]
//url = 
let params = {};
for(let i = 0; i <paramNames.length;i++) {
    params[paramNames[i]] = values[i]
}
console.log(params);

