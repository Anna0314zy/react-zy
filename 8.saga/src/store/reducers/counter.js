
import * as types from '../action-types'
//1.参数一样 返回值一样 2.没有改变函数作用域之外的变量
let ininState = { number: 0 }
export default function (state = ininState, action) {
    switch (action.type) {
        case types.INCREMENT:
            console.log('reducer-a');
            return { number: state.number + 1 }
        default:
            return state;
    }

}