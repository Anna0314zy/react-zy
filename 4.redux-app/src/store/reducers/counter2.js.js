import * as types from '../action-types';
function reducer(state=0, action) {
    switch (action.type) {
        case types.INCREMENT2:
            return state + 1;
        case types.DECREMENT2:
            return state - 1;
        default:
            return state;

    }
}
export default reducer;