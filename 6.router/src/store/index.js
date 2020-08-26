import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers'
import {routerMiddleware} from '../connected-react-router'; //中间件
import history from './history'
//知识点 数据持久化
import { persistStore, persistReducer } from '../redux-persist'
import storage from '../redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducers)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// let store = createStore(reducers);
// let store = applyMiddleware(routerMiddleware(history))(createStore)(reducers) 两种写法
let store = createStore(persistedReducer,composeEnhancers(applyMiddleware(routerMiddleware(history))))
window.store = store;
let persistor = persistStore(store)
export {
    store,
    persistor
}