import React, { Component } from 'react'
import Context from './context'
let pushState = window.history.pushState;

export default class BrowserRouter extends Component {
    state = {
        location:{pathname:window.location.pathname, state:null}
    }
    componentDidMount() {
        console.log(window)
        const that = this;
        window.history.pushState = (state, title, url) => {
            console.log('window.history.pushState', state, title, url);
            pushState.call(window.history,state, title, url);
            window.onpushstate.call(that, state, url);
        }
        window.onpopstate = (event) => {
            console.log(event, 'window-event--onpopstate')
            that.setState({
                location: {
                    ...that.state.location,
                    pathname:window.location.pathname,
                    state: event.state
                }
            })
        }
        window.onpushstate = (state, pathname) => {
            console.log('window-event--onpushstate')
            that.setState({
                location: {
                    ...that.state.location,
                    pathname,
                    state
                }
            })
        }
    }
    render() {
        let that =this;
        let value = {
            location:that.state.location,
            history:{
                push(to) { //定义一个history对象  有一个push方法来跳转路径
                    // message = {location => }
                    //that.block = message
                   if (that.block) {
                       let confirm =  window.confirm(that.block(typeof to === 'object' ? to : {pathname:to}));
                       if (!confirm) return;
                   }
                  
                    if (typeof to === 'object') {
                       let {pathname, state} = to;
                       //状态  标题  路径
                       window.history.pushState(state, '', pathname);
                   }else {
                    // window.location.hash = to; //触发hashchange
                    window.history.pushState(null, '', to);
                   }
                },
                block(message) {
                    console.log('block-message', message);
                    that.block = message;
                }
            }
        }
        return (
            <div>
                <Context.Provider value={value}>
                    {this.props.children}
                </Context.Provider>
            </div>
        )
    }
}
