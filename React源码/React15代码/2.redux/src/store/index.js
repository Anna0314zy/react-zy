import {createStore} from '../redux';
import reducer from './reducers';
console.log(reducer, 'reducer-----');
let store = createStore(reducer);
export default store;