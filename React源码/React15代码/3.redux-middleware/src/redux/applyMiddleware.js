import compose from './compose';
// let store = applyMiddleware(promise,thunk,logger)(createStore)(rootReducer);
// export default  function({getState,dispatch}){   //getState用来获取仓库状态 dispatch用来重新开派发动作
//   return function(next){//next是为了调用原生的dispatch方法
//      return function(action){
//        console.log('thunk----', typeof action === 'function');
//        if(typeof action === 'function'){//如果派发了一个函数过来
//          return action(dispatch);
//        }else{
//           next(action);
// }}}}
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