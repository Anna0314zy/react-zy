import {createStore,applyMiddleware} from 'redux'
import reducer from './reducers'
import rootsage from '../store/saga/index'
// let store = createStore(reducer);
import createSagaMiddleware from 'redux-saga';
let sagaMiddleware = createSagaMiddleware();
let store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
//sagaMiddleware 就是一个执行器 可以启动helloSaga 这个监听函数的执行
sagaMiddleware.run(rootsage);//run只能有一个 co库
export default store;