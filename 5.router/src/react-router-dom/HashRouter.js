import React, { Component } from 'react'
import Context from './context'
export default class HashRouter extends Component {
    state = {
        location:{pathname:window.location.hash.slice(1) || '/', state:null}
    }
    componentDidMount() {
        window.location.hash = window.location.hash || '/';
        window.addEventListener('hashchange', (e) => {
            console.log(e);
            this.setState({
                location: {
                    ...this.state.location,
                    pathname:window.location.hash.slice(1),
                    state: this.locationState
                }
            })
        })
    }
    locationState = null;//私有属性
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
                       that.locationState = state; 
                   window.location.hash = pathname; //触发hashchange
                //    console.log(path, window.location.hash)
                   }else {
                    that.locationState = null; 
                    window.location.hash = to; //触发hashchange
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
