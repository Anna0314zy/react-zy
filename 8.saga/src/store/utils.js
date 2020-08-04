// delay大概意思
export const delay = function(ms) {
    return new Promise((reslove, reject) => {
        setTimeout(()=> {
            console.log(this) //null
            let result = Math.random();
            // if (result > .5) {
            //     reslove(result);
            // }else {
            //     reject('发生了错误')
            // }
            if (result > .5) {
                reslove({code:0, data: result});
            }else {
                reslove({code:1, erroe: '发生了错误'});
            }
        }, ms)
    })
}
//node里面的readFile
export const readFile = function(filename, callback) {
    console.log(filename, 'filename');
    setTimeout(() => {
        callback(null, filename +"‘s content" );
    },1000)
}