import createStore from './createStore'
import bindActionCreators from './bindActionCreators'
import combineReducers from './combineReducers'
import applyMiddleware from './applyMiddleware';
export  {
    createStore,//创建仓库
    bindActionCreators, //把actioncreatore 与 dispatch绑定到一起
    combineReducers,//合并reducers
    applyMiddleware
}