const add = (x, y) => {
    console.log(1);//同步先执行
    setTimeout(() => console.log(2), 1000) //放到宏任务队列 1秒后执行
}
add();
setTimeout(() => console.log(3))//放到宏任务队列 微任务执行完就可以执行
new Promise(reslove => {
    console.log(4) //微任务 先执行
    setTimeout(() => console.log(5), 100) //宏任务
    for(let i = 0; i< 100; i++) { //这个循环执行99 次
        i===99 && reslove() //这i = 99 时 reslove() 可以.then
    }
})
.then(() => {
    setTimeout(() => {
        console.log(6) //宏任务队列 
    }, 0)
    console.log(7); //
})
// 1 4 7 3 6 5 2 