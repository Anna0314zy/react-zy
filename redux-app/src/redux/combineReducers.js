export default function (reducers) {
    //实现reducer的合并
    //reducers {counter1:counter1, counter2:counter2}
    const reducerKeys = Object.keys(reducers);//['counter1', 'counter2']
    return function (state = {}, action) {

        //这里应该是给 合并成新的reducer  reducer 需要传参
        const nextState = {};//下一个状态对象
        for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i];//counter1
            const reducer = reducers[key];
            const previouStateForKey = state[key]; //老状态
            const nextStateForKey = reducer(previouStateForKey, action);
            nextState[key] = nextStateForKey;
        }
        return nextState;
    }

}