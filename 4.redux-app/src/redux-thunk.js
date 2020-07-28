//中间件


//action 延迟一秒加1 检验传过来的是不是函数 帮忙处理下
function createThunkMiddleWare(extraArgument) {
    console.log(extraArgument, 'extraArgument');
     // let middlewareAPI  = {
    //     getState: store.getState,
    //     dispatch: (...args) => dispatch(...args)
    // }
    // const chain = middleware.map(middleware => middleware(middlewareAPI));
   
    // dispatch = compose(...chain)(store.dispatch);
    return ({dispatch, getState}) => next => action => {
        if (typeof action === 'function') {
            console.log(action, 'actions----')
           return action(dispatch, getState, extraArgument);
        }
        return next(action);
    }
}
const thunk = createThunkMiddleWare();
thunk.withExtraArgument = createThunkMiddleWare;
export default  thunk;
// export default function logger({getState}) {
//     return function (next) {
//         return function (action) {
//             console.log('老状态1', getState());
//             next(action);
//             console.log('新状态1', getState());
//         }
//     }
// }
//next 可能是下一个中间件 也可能是store.dispatch
//action 
// return function (dispatch, getState) {
//     setTimeout(() => {
//         dispatch({ type: types.INCREMENT })
//     }, 1000)
// }
