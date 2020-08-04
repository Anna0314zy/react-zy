


export function take(actionType) {
    console.log('effect-take', actionType);
    return {
        type:'TAKE',
        actionType
    }
}
export function put(action) {
    console.log('effect-put', action);
    return {
        type:'PUT',
        action
    }
}
export function fork(task) {
    return {
        type: 'FORK',
        task
    }
}
//takeevery 相当于要开启一个新的子进程，单独监听actionType,当动作发生的时候去执行迭代器
export function* takeEvery(actioType,generator) {
    yield fork(function*() {
        while(true) {
            yield take(actioType);
            yield generator();//increment
        }
    })
}
export function call(fn, ...args) {
    return {
        type: 'CALL',
        fn,
        args
    }
}
const innerDelay = ms => new Promise((reslove, reject) => {
    setTimeout(() => {
        reslove(ms);
    }, ms)
})
export function delay(...args) {
    return call(innerDelay, ...args)
}
export function cps(fn, ...args) {

    return {
        type: 'CPS',
        fn, 
        args
    }
}
export function all(fns) {
    return {
        type: 'ALL',
        fns
    }
}
export function cancel (task) {
   return {
       type:'CANCEL',
       task
   }
}