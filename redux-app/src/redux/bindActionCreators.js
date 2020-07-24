function bindActionCreator(actionCreator, dispatch) {
    return function() {
     return dispatch(actionCreator.apply(this,arguments));
    }
 }
 export default function bindActionCreators(actionCreators, dispatch) {
     if (typeof actionCreators === 'function') {
         bindActionCreator(actionCreators, dispatch);
     }
     //传的是整个action对象
     const bindActionCreators = {};
     for(const key in actionCreators) {
         //把每个键值重写成 方法 直接调用
         bindActionCreators[key] = bindActionCreator(actionCreators[key], dispatch);
     }
     return bindActionCreators;
 }