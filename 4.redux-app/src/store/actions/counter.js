import * as types from '../action-types';
const actions = {
    increment(value) {
        // store.dispatch({ type: INCREMENT });
        return { type: types.INCREMENT, payload: value };
    },
    decrement() {
        // store.dispatch({ type: DECREMENT })
        return { type: types.DECREMENT };
    },
    //thunk.js
    //延迟一秒加1
    asyncIncrement() {
        // console.log('asyncIncrement');
        return function (dispatch, getState, amount) {
            //getState获取老状态
            console.log(amount, 'amount');
            setTimeout(() => {
                dispatch({ type: types.INCREMENT, payload: amount })
            }, 1000)
        }
    },
    promiseIncrement() {
        return {
            type: types.INCREMENT,
            payload: new Promise((reslove, reject) => {
                setTimeout(() => {
                    let result = Math.random();
                    if (result > 0) {
                        reslove({number:result});
                    } else {
                        reject({number:result});
                    }
                }, 1000)
            })
        }
    }
}


export default actions;