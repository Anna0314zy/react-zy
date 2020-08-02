import {all} from 'redux-saga/effects'; //这个库里有delay
import hellosaga from './hellosaga'
import watchIncrementAsync from './watchIncrementAsync'

import readAsync from './readAsync'
import LoginSaga from './loginSaga'
import raceSaga from './raceSaga'
import raceSaga2 from './recesaga2'
/**
 * 1.rootsage 入口saga是用组织和调用别的saga generator
 * 2.监听saga 监听向仓库派发动作的 如果监听到某些动作 会通知worker去执行
 * 3.worker saga 真正干活的saga 真正执行任务的saga
 */

export default function* rootsage() {
    yield all([
        hellosaga(),
        watchIncrementAsync(),
        readAsync(),
        LoginSaga(),
        raceSaga(),
        raceSaga2()
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