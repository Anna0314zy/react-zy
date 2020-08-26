import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home'
import Counter from './components/counter'
import { Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { ConnectedRouter } from './connected-react-router';
import history from './store/history'
import { PersistGate } from '../redux-persist/integration/react'
//1.我们可以向仓库派发一个跳转路径的动作 动作发生后中间件进行拦截处理 进行跳转
//2.当路径发生改变的时候 可以把当前的路径信息存放到仓库中 router属性里
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <>
          <Link to="/">Home</Link>
          <Link to="/counter">counter</Link>
          <hr />
          <Route path="/" exact={true} component={Home}></Route>
          <Route path="/counter" component={Counter}></Route>
        </>
      </ConnectedRouter>
    </PersistGate>

  </Provider>

  , document.getElementById('root')
);
