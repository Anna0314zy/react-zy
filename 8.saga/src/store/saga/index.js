import {all} from '../../redux-saga/effects'; //这个库里有delay
import counterSaga from './counterSaga'
import logSaga from './logSaga'
import autoSaga from './Aotosaga'

export default function* rootsage() {
    //立刻启动所有的generator 等全部完成后saga才算完成
    yield all([
        counterSaga(),
        logSaga(),
        autoSaga()
    ])
    console.log('logersaga结束了')
}
