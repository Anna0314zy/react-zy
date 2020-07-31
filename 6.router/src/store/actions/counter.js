import * as types from '../action-types'
import reducers from '../reducers'
import { push } from '../../connected-react-router'
export default {
    increment() {
        return {type:types.INCREMENT}
    },
    decrement() {
        return {type:types.DECREMENT}
    },
    // login(name, pwd) {
    //     return function() {

    //     }
    // },
    goHome() {
        return push('/');
    }
}
// react-router-redux