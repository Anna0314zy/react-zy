import { take, put, call, fork, cancel, cancelled } from 'redux-saga/effects'; //这个库里有delay
import * as types from '../action-types'
import api from './api'
function* login(username, password) {
    try {
        api.setItem('loading', 'true');
        //api.login是一个promise
        const token = yield call(api.login, username, password);
        yield put({ type: types.LOGIN_SUCESS, payload: token });
        api.setItem('loading', 'false');
    } catch (error) {
        alert(error);
        api.setItem('loading', 'false');
        yield put({ type: types.LOGIN_ERROR, error })
    }finally{
        //不管成功还是失败
        if (yield cancelled()) {
            api.setItem('loading', 'false');
        }
    }
}
export default function* () {
    while (true) {
        let { payload: { username, password } } = yield take(types.LOGIN);
        //如果接口很慢 => 等不及了 就点击退出 就监听不到了 永远是登录状态 
        //不希望 阻塞操作 退出登录
        // const token = yield call(login, username, password);
        //fork 就相当于开启了一个子进程 他会单独去执行 
        // 不会影响当前的主进程执行，主进程会立刻向下执行  这是打个比方哟  后面看源码实现
        //我们拿不到login的返回值，但是可以得到一个任务对象
       const task = yield fork(login, username, password); //我们拿不到login方法的返回值 但是可以得到一个任务对象的返回值
        // if (token) {
            //一旦登录成功了 就可以开始监听退出的动作
           const action =  yield take(types.LOGIN_OUT);
           console.log('action-logout', action);
           if (action.type === types.LOGIN_OUT) {
               yield cancel(task);
           }
            yield put({ type: types.LOGIN_OUT_SUCCESS });
        // }
    }
}