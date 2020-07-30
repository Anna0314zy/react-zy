import React, { Component } from 'react'
// import { Redirect } from '../react-router-dom';
import local from '../local'
import {Prompt} from 'react-router-dom'
export default class UserAdd extends Component {
    state = {blocking: false} //默认不阻止
    constructor(props) {
        super(props);
        console.log(React, 'react')
        this.usernameRef = React.createRef();
        this.emailRef = React.createRef();
        console.log(this.userNameRef,  this.emailRef);
    }
    handleSubmit = (event) => {
        console.log(this.usernameRef, this.emailRef)
        let username = this.usernameRef.current.value;
        let email = this.emailRef.current.value;
        let user = {id:Date.now(), username,email};
        local.add(user);
        this.props.history.push('/user/list');
        event.preventDefault();

    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Prompt when={this.state.blocking} message={location=> `你确定要跳转到${location.pathname}`}></Prompt>
                <div className="form-grounp">
                    <label className="control-label">用户名</label>
                    <input className="form-control" ref={this.usernameRef} 
                    onChange={event=> this.setState({blocking: this.state.blocking || event.target.value.length > 0})}/>
                </div>
                <div className="form-grounp">
                    <label className="control-label">邮箱</label>
                    <input className="form-control" ref={this.emailRef} 
                    onChange={event=> this.setState({blocking: this.state.blocking || event.target.value.length > 0})}/>
                </div>
                <div className="form-grounp">
                    <button className="bn"type="submit">提交</button>
                </div>
            </form>
        )
    }
}
