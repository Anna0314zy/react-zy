import * as types from '../action-types'

export default {
    increment() {
        return {type:types.INCREMENT}
    },
    decrement() {
        return {type:types.DECREMENT}
    },
    asyncIncrement() {
        return {type:types.ASYNC_INCREMENT}
    },
    stop() {
        return {type:types.CANCAL_COUNTER}
    }

}