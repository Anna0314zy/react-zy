import { race, call, take, put } from "redux-saga/effects";
import * as types from '../action-types'
/**
 * 1.有时候我们同时启动多个任务 但又不想等待所有任务完成，我们只希望拿到胜利者：即第一个被reslove（或reject）的任务
 * 2.race 的另一个有用的功能是 他会自动取消那些失败的effects
 * 
 */

const delay = ms => new Promise((reslove, reject) => {
    setTimeout(() => {reslove(ms)}, ms)
})
function* start() {
    while(true) {
        yield call(delay, 1000);
        yield put({type:types.INCREMENT})
    }
}
export default function* () {
    yield race({
        start: call(start),
        stop: take(types.CANCAL_COUNTER)
    })
}