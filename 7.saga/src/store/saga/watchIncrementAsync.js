import * as types from '../action-types';

import { takeEvery, take, put, call , all, select} from 'redux-saga/effects'; //这个库里有delay
import { delay } from '../utils'
export function* incrementAsync() {
    
}
export function* watchAndLog() {
    while(true) {
        let action = yield take('*');
        console.log(action, 'action');
        //如何在saga中获取中心的状态树
        const state = yield select(state=> state.counter);
        console.log(state, 'state');
    }
}
export function* watchIncrementAsync() {
    for(let i = 0; i < 3; i++) {
        //take 监听一次ASYNC_INCREMENT 动作 如果有人向仓库派发了动作 ASYNC_INCREMENT向下继续执行
        const action = yield take(types.ASYNC_INCREMENT);
        console.log(action);
        yield put({type: types.INCREMENT});
    }
    alert('最多执行3次')
}
export default function* rootSaga() {
    //tabkeEvery 是take的语法糖
    yield all([
        watchAndLog(),//监听每个动作，当动作发生的时候打印日志
        watchIncrementAsync() //监听异步加1的动作
    ])
}
