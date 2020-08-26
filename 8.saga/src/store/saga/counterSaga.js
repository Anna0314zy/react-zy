import {take, put, takeEvery, call, cps} from '../../redux-saga/effects'
import * as types from '../action-types'
// import {delay} from '../utils'

// const delay = ms => new Promise((reslove, reject) => {
//     setTimeout(() => {
//         reslove(ms);
//     }, ms)
// })
const delay = (ms, callback) => {
   setTimeout(() => {
     callback(ms);
    }, ms)
}
function* increment() {
    // let result = yield call(delay, 1000);
    // let result = yield delay(1000);
    let result = yield cps(delay, 1000);
    console.log('result=====', result);
    yield put({type:types.INCREMENT})
}

// export default function* first() {
//     for (let i = 0; i< 3;i++) {
//         const action = yield take(types.ASYNC_INCREMENT);
//         console.log(action, 'counter-action');
//         yield increment();
//         console.log('完成一次循环')
//     }
//     alert('最多执行3次');
// }
// export default function* () {
//     // yield takeEvery(types.ASYNC_INCREMENT, increment)
//     console.log('couter-saga')
//     for (let i = 0; i< 3;i++) {
//         // debugger;
//         const action = yield take(types.ASYNC_INCREMENT);
//         //订阅 等待派发动作 派发动作又走了一遍next(action) 又开始订阅
//         console.log(action, 'counter-action--------------');
//         yield put({type:types.INCREMENT});
//     }
//     alert('最多执行3次');//先走到这 才开始加1
// }
// function* increment() {
//     yield put({type:types.INCREMENT})
// }
export default function* () {
    yield takeEvery(types.ASYNC_INCREMENT, increment)
}