import { createStore, applyMiddleware} from '../redux';
import reducers from './reducers';
import logger1 from '../react-logger'
import logger2 from '../react-logger2'


/**
 * 老状态1
 * 老状态2
 * 改状态
 * 新状态2
 * 新状态1
 */
let store = applyMiddleware(logger1,logger2)(createStore)(reducers);
// console.log(store, 'store---index');
//此处赋初始值优先级最高
// const store = createStore(reducers);
//中间件模拟
// let dispatch = store.dispatch;
// store.dispatch = function(action) {
//     console.log('老状态', store.getState());
//     dispatch(action);
//     console.log('新状态', store.getState());

// }
export default store;
