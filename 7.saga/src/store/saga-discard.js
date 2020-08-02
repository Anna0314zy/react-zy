import {all, takeEvery, put, call} from 'redux-saga/effects'; //这个库里有delay
import * as types from './action-types';

/**
 * 1.rootsage 入口saga是用组织和调用别的saga generator
 * 2.监听saga 监听向仓库派发动作的 如果监听到某些动作 会通知worker去执行
 * 3.worker saga 真正干活的saga 真正执行任务的saga
 */
export function* hellosaga() {
    console.log('hello saga');
}
// delay大概意思
export const delay = function(ms) {
    return new Promise((reslove, reject) => {
        setTimeout(()=> {
            console.log(this) //null
            reslove(this.username);
        }, ms)
    })
}
//node里面的readFile
export const readFile = function(filename, callback) {
    setTimeout(() => {
        callback(null, 'content');
    },1000)
}
export function* incrementAsync() {
    //当你yield 一个promise的时候 saga中间件可以接受这个promise 会等待完成
    //完成后会把这个resolve的值赋给msg 再接着往下走
    // let msg =  yield delay(1000); == yield call(delay, 1000);
    //系统的delay 内部调用了call方法
    let obj = {username:'zhufeng'}; //让delay 的this指向obj
    let msg = yield call([obj,delay], 1000);
    //let msg = yield apply(obj,delay, 1000); //另一种写法
    // let msg = yield call(delay, 100); //call就是调用一个函数
    console.log('msg', msg);
    yield put({type:types.INCREMENT})
}
export function* watchIncrementAsync() {
    console.log('hello saga-async');
    //监听每一次的ASYNC_INCREMENT 每当有人向仓库派发这个动作的时候 就会调用另一个worker saga
    //每当yield一个值 一般被称为effect 就相当于告诉saga中间件执行某些处理
    yield takeEvery(types.ASYNC_INCREMENT, incrementAsync)
}
export default function* rootsage() {
    yield all([
        hellosaga(),
        watchIncrementAsync()
    ])
    // {
    //     type:'All',
    //     payload: [hellosaga, watchIncrementAsync]
    // }
    console.log('next');
}
// ES6中定义了一种新的函数.用function*定义生成器函数,
// 这种函数会返回一个generator对象
// .生成器函数在执行时可以暂停，然后又可以在暂停处接着执行。
/**
 * saga相对于thunk的有点
 * 1.便于单元测试
 */