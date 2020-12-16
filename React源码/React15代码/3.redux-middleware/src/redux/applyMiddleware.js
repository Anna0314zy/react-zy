import compose from './compose';
// let store = applyMiddleware(promise,thunk,logger)(createStore)(rootReducer);
// export default  function({getState,dispatch}){   //getState用来获取仓库状态 dispatch用来重新开派发动作
//   return function(next){//next是为了调用原生的dispatch方法
//      return function(action){
//          console.log(`老状态:${JSON.stringify(getState())}`);
//          next(action);
//          console.log(`新状态:${JSON.stringify(getState())}`);
//      }
//   }
// }
// 如果只有一个中间的写法
// let store = applyMiddleware(promise,thunk,logger)(createStore)(rootReducer);
// function applyMiddleware(middleware) {
//  return function(createStore) {
//    return function(reducer) {
//      let store = createStore(reducer);
//      middlewareWithstore=middleware({getState:store.getState,dispatch:store.dispatch});
//      let dispatch = middlewareWithstore(store.dispatch);
//     return {
//       ...store,
//       dispatch
//     }
//    }
//  }
// }
export default function applyMiddleware(...middlewares){//middlewares=['thunk','logger']
  return function(createStore){
    return function(...args){
       let store = createStore(...args);
       let dispatch;
       let middlewareAPI= {
         getState:store.getState,//获取仓库中的状态
         dispatch:(...args)=>dispatch(...args)//派发动作
       };
       const chain = middlewares.map(middleware=>middleware(middlewareAPI));
       dispatch = compose(...chain)(store.dispatch);
       return {
          ...store,
          dispatch
       };
    }
  }
}