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
    console.log('result=', result);
    yield put({type:types.INCREMENT})
}

function* first() {
    console.log('开始执行countersaga')
    for (let i = 0; i< 3;i++) {
        const action = yield take(types.ASYNC_INCREMENT);
        console.log(action, 'counter-action');
        yield increment();
        console.log('完成一次循环')
    }
    alert('最多执行3次');
}
export default function* () {
    yield takeEvery(types.ASYNC_INCREMENT, increment)
}