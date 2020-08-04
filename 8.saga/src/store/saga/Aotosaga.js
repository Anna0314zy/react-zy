import {take, put, takeEvery, call, cps, all, fork, delay, cancel} from '../../redux-saga/effects'
import * as types from '../action-types'
function* increment () {
    while(true) {
        yield delay(1000);
        yield put({type:types.INCREMENT});
    }
}


export default function* () {
    const task = yield fork(increment);
    yield take(types.STOP_INCREMENT);
    yield cancel(task);
}