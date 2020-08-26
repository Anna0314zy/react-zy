// let reducers = combineReducers({
//     router:connectRouter(history), //把当前信息存放到store
//     counter
// })
//reducer处理仓库的数据
import { LOCATION_CHANGE } from './constants'
export default function (history) {
    let ininstate = {
        action: history.action, 
        location: history.location
    }
    return function (state = ininstate, action) {
        console.log(action.type, 'action.type');
        // debugger;
        switch (action.type) {
            case LOCATION_CHANGE:
                // {type: "@@router/LOCATION_CHANGE", payload: {…}}
                // payload:
                // action: "PUSH"
                // location: {pathname: "/", search: "", hash: "", state: undefined, key: "pgjdgh"}
                // __proto__: Object
                // type: "@@router/LOCATION_CHANGE"
                // __proto__: Object
                console.log(action, 'action.payload')
                return action.payload;
            default:
                return state;
        }
    }
}