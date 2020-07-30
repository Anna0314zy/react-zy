import React, { Component } from 'react'
//重定向
import RouterContext from './context'
export default class Redirect extends Component {
    static contextType = RouterContext;
    
    render() {
        console.log('rediect');
        this.context.history.push(this.props.to);
        return null;
    }
}
