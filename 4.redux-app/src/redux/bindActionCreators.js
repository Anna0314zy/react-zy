function bindActionCreator(actionCreator, dispatch) {
    return function() {
     return dispatch(actionCreator.apply(this,arguments));
    }
 }
 export default function bindActionCreators(actionCreators, dispatch) {
     if (typeof actionCreators === 'function') {
         return bindActionCreator(actionCreators, dispatch);
     }
     //传的是整个action对象
     const bindActionCreators = {};
     for(const key in actionCreators) {
         //把每个键值重写成 方法 直接调用 替换掉老方法
         bindActionCreators[key] = bindActionCreator(actionCreators[key], dispatch);
     }
     return bindActionCreators;
 }
//  actionCreators = {
//      increment() {
//          return types.INCREMENT
//      }
//  }
//  bindActionCreators的作用是将一个或多个action和dispatch组合起来生成