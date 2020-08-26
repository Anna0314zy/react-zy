import { take } from "../../redux-saga/effects" ;
import * as types from '../action-types'

import {takeEvery, put} from '../../redux-saga/effects'
function* logger(params) {
    console.log('logger'); 
}
export default function*() {
    for(let i = 0; i < 3; i++) {
        console.log('loagger开始了')
        yield take(types.ASYNC_INCREMENT);
        yield logger();
    }
    // yield takeEvery(types.ASYNC_INCREMENT, logger);
    console.log('logger-saga结束了')
}