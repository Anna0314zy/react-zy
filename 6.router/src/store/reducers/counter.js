
import * as types from '../action-types'
let initState = { number: 0 };
 function reducer (state = initState, action) {
    switch (action.type) {
        case types.INCREMENT:
            console.log(state, 'state');
            return { number: state.number + 1 };
        case types.DECREMENT:
            return { number: state.number - 1 };
        default:
            return state;
    }
}
export default reducer;