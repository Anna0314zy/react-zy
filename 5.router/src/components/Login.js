import React, { Component } from 'react'

export default class Login extends Component {
    handleLogin =() => {
        localStorage.setItem('login', 'true');
        console.log(this.props, 'this.props')
        if (this.props.location.state) {
                this.props.history.push(this.props.location.state.from);
        }else {
            this.props.history.push('/');
        }
    }
    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.handleLogin}>登录</button>
            </div>
        )
    }
}
