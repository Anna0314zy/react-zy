import * as types from '../action-types';

import { takeEvery, put, call } from 'redux-saga/effects'; //这个库里有delay
import { delay } from '../utils'
export function* incrementAsync() {
    //当你yield 一个promise的时候 saga中间件可以接受这个promise 会等待完成
    //完成后会把这个resolve的值赋给msg 再接着往下走
    //系统的delay 内部调用了call方法
    // let obj = {username:'zhufeng'}; //让delay 的this指向obj
    // let msg = yield call([obj,delay], 1000);
    //let msg = yield apply(obj,delay, 1000); //另一种写法
    // try {
    //     let msg = yield call(delay, 1000); //call就是调用一个函数
    //     console.log('msg', msg);
    //     yield put({ type: types.INCREMENT })
    // } catch (error) {
    //     alert(error)
    // }
    let {code, data, error} = yield call(delay, 1000);
    if (code === 0) {
        yield put({ type: types.INCREMENT })
    }else {
        alert(error);
    }
}
export default function* watchIncrementAsync() {
    console.log('hello saga-async');
    //监听每一次的ASYNC_INCREMENT 每当有人向仓库派发这个动作的时候 就会调用另一个worker saga
    //每当yield一个值 一般被称为effect 就相当于告诉saga中间件执行某些处理
    yield takeEvery(types.ASYNC_INCREMENT, incrementAsync)
}
//后台接口处理 
// 1.后台
