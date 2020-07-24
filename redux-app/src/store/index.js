import { createStore } from '../redux';
import reducers from './reducers';
//此处赋初始值优先级最高
const store = createStore(reducers);
export default store;
