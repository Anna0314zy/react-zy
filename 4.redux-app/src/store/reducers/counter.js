import * as types from '../action-types';
let initState = { number: 1 };
function reducer(state = initState, action) {
    console.log(action, 'action');
    switch (action.type) {
        case types.INCREMENT:
            return { number: state.number + (action.payload ? action.payload.number : 1) }
        case types.DECREMENT:
            return { number: state.number - 1 }
        default:
            return state;

    }
}
export default reducer;
//以上用react-redux