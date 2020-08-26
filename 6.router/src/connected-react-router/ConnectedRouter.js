import React, { Component } from 'react'
import {Router} from 'react-router'//react-router-dom是浏览器端的router
import {LOCATION_CHANGE} from './constants'
import { ReactReduxContext } from 'react-redux'
//react-router-dom 是浏览器端的Router
//hashrouter 就是一个拥有了hashhistory 的reactrouter 
export default class ConnectedRouter extends Component {
    static contextType = ReactReduxContext;
    componentDidMount() {
        //监听路径的变化 每当路径发生变化后 都会执行监听函数 并传入第二个参数新的路径新的动作
        //action 'push' 'pop'
        this.unlistener = this.props.history.listen((location, action) => {
            this.context.store.dispatch({
                type: LOCATION_CHANGE,
                payload:{location, action}
                //location  action =‘pop’ || 'push'
            })
        })
    }
    componentWillUnmount() {
        this.unlistener();
    }
    render() {
        let {history, children} = this.props;
        return (
            <Router history={history}>
                {children}
            </Router>
        )
    }
}
//多了个监听的功能
