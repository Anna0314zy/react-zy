import {take, put, takeEvery, call, cps} from '../../redux-saga/effects'
import * as types from '../action-types'
// import {delay} from '../utils'
function* increment() {
    yield put({type:types.INCREMENT})
}

export default function* () {
    // yield takeEvery(types.ASYNC_INCREMENT, increment)
    console.log('couter-saga')
    for (let i = 0; i< 3;i++) {
        // debugger;
        const action = yield take(types.ASYNC_INCREMENT);
        //订阅 等待派发动作 派发动作又走了一遍next(action) 又开始订阅
        yield increment();
    }
    alert('最多执行3次');//先走到这 才开始加1
}