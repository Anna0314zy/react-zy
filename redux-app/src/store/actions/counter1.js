import * as types from '../action-types';
 const actions = {
    increment(value) {
        // store.dispatch({ type: INCREMENT });
        return { type: types.INCREMENT1, payload: value };
    },
    decrement() {
        // store.dispatch({ type: DECREMENT })
        return { type: types.DECREMENT1 };
    }
}
export default actions;