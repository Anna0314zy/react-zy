import {combineReducers} from 'redux'
import counter from './counter'
// console.log(counter)
let reducers = combineReducers({
    counter
})
export default reducers;