import * as types from '../action-types';
 const actions = {
    increment(value) {
        // store.dispatch({ type: INCREMENT });
        return { type: types.INCREMENT, payload: value };
    },
    decrement() {
        // store.dispatch({ type: DECREMENT })
        return { type: types.DECREMENT };
    }
}
export default actions;