
function isPromise(obj) {
    //判断是不是一个promise 判断.then属性是不是一个function
    return !!obj && (typeof obj == 'object' || typeof obj == 'function') && (typeof obj.then == 'function')
}
export default function({dispatch,getState}) {
    return next => action => {
        return isPromise(action.payload) ? action.payload.then(result => {
           dispatch({...action, payload: result});
        }).catch((error) => {
            dispatch({...action, payload:error, error:true});
            //必须return 一个失败
            return Promise.reject(error);
        }): next(action);
    //     promiseIncrement() {
    //         return {
    //             type: types.INCREMENT,
    //             payload: new Promise((reslove, reject) => {
    //                 setTimeout(() => {
    //                     let result = Math.random();
    //                     if (result > .5) {
    //                         reslove(result);
    //                     } else {
    //                         reject(result);
    //                     }
    //                 }, 1000)
    //             })
    //         }
    //     }
    }
}
