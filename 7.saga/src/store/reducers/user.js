
import * as types from '../action-types'
let ininstate = { username: null }
export default function (state = ininstate, action) {
    switch (action.type) {
        case types.LOGIN_SUCESS:
            return { token: action.payload }
        case types.LOGIN_ERROR:
            return { error: action.error }
        case types.LOGIN_OUT_SUCCESS:
            return {}
        default:
            return state;
    }
}