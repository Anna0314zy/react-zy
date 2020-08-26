import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from './react-router-dom';
import Home from './components/Home'
import User from './components/User'
import Profile from './components/Profile'
import 'bootstrap/dist/css/bootstrap.css'
import Protected from './components/Protected'
import Login from './components/Login'
import MeauLink from './components/MeauLink'
import NavHeader from './components/NavHeader'
import './index.css'
ReactDOM.render(
  <Router>
    <>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <NavHeader/>
          <ul className="nav navbar-nav">
            {/* <li>珠峰架构</li> */}
            <li><MeauLink to="/" exact>首页</MeauLink></li>

            <li><MeauLink to='/user'>用户中心</MeauLink></li>
            <li><MeauLink to="/profile">个人中心</MeauLink></li>
            <li><MeauLink to="/login">登录</MeauLink></li>
            {/* <li><Link to={{ pathname: '/', state: { title: '首页' } }}>首页</Link></li>
            <li><Link to={{ pathname: '/user', state: { title: '首页' } }}>用户中心</Link></li>
            <li><Link to={{ pathname: '/profile', state: { title: '首页' } }}>个人中心</Link></li>
            <li><Link to="/login">登录</Link></li> */}
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Route path="/" component={Home} exact></Route>
            <Route path="/user" component={User}></Route>
            <Route path="/login" component={Login}></Route>
            <Protected path="/profile" component={Profile}></Protected>
          </div>
        </div>
      </div>
      {/* <nav> */}
      {/* <Link to="/">首页</Link>
    <Link to="/user">用户中心</Link>
    <Link to="/profile">个人中心</Link> */}
      {/* </nav> */}

    </>
  </Router>,
  document.getElementById('root'))
