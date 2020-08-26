import isPlainObject from './utils/isPlainObject'
import actionTypes from './utils/actionTypes'

export default function createStore(reducer, preloadedState) {
    if(typeof reducer !== 'function') {
        return new Error('reducer必须是一个函数')
    }
    let currentReducer = reducer;//当前的处理器
    let currentState = preloadedState; //当前状态
    let currentListeners = [];//保存当前的监听函数
    function getState() {
        return currentState;
    }
    function dispatch(action) {
        if(!isPlainObject(action)) {
            throw new Error('action必须是一个纯对象')
        }
        if (typeof action.type === 'undefined') {
            throw new  Error('action的type的属性不能是undefined');
        }
        currentState = currentReducer(currentState, action);
        //状态发生变化  通知
        for (let i = 0; i < currentListeners.length;i++) {
            const listener = currentListeners[i];
            listener();
        }
        return action;
    }
    //订阅
    function subscribe(listener) {
        currentListeners.push(listener);
        //源码优化  let 
        let subscribed = true;
        return function unsubscribe() {
            if (!subscribed) return;
            const index = currentListeners.indexOf(listener);
            console.log(index, currentListeners);
            currentListeners.splice(index, 1);
            subscribed = false;
        }
    }
    //如果state是通过reducer传过来的  没法拿到初始化状态 必须做以下处理
    dispatch({type:actionTypes});//preloadedState 可能没有传
    return {
        getState,
        subscribe,
        dispatch
    }
}