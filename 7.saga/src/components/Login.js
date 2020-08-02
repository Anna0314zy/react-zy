import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions/login'
class Login extends Component {
    constructor() {
        super();
        this.usernameRef = React.createRef();
        this.pwdRef = React.createRef();
    }
    login = () => {
        let username = this.usernameRef.current.value;
        let pwd = this.pwdRef.current.value;
        this.props.login(username, pwd);
    }

    render() {
        let loginForm = (
            <>
                <label>用户名</label><input type="text" ref={this.usernameRef}/>
                <label>密码</label><input type="text" ref={this.pwdRef}/>
                <button onClick={this.login}>登录</button>
                <button onClick={this.props.logout}>退出登录</button>
            </>
        )
        let logoutForm = (
            <>
                <label>用户名</label>{this.props.token}
                <button onClick={this.props.logout}>退出登录</button>
            </>
        )
        return (
            this.props.token ? logoutForm : loginForm
        )
    }
}
export default connect(state => state.user, actions)(Login)
