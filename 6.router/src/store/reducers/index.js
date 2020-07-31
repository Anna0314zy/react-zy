import {combineReducers} from 'redux'
import counter from './counter'
import { connectRouter } from '../../connected-react-router'
import history from '../history'
// console.log(counter)
let reducers = combineReducers({
    router:connectRouter(history), //把当前信息存放到store
    counter
})
export default reducers;