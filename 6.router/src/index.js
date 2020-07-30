import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home'
import Counter from './components/counter'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <>
        <Link to="/">Home</Link>
        <Link to="/counter">counter</Link>
        <hr />
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/counter" component={Counter}></Route>
      </>
    </Router>
  </Provider>

  , document.getElementById('root')
);
