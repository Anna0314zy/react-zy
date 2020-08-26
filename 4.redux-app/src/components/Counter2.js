import React, { Component } from 'react'
import {bindActionCreators}  from '../redux';
import store from '../store';
import actions from '../store/actions/counter2'


// let INCREMENT = 'INCREMENT';
// let DECREMENT = 'DECREMENT';
//在redux中 动作是有规定的 规定必须有一个不为undefined type属性 用来表示动作类型

let boundActions = bindActionCreators(actions, store.dispatch);
export default class  extends Component {
    constructor() {
        super();
        this.state = { number: store.getState().counter2 }
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ number: store.getState().counter2 })
        })
    }
    componentWillUnmount() {
        //取消订阅
        this.unsubscribe();
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={boundActions.increment}>+</button>
                <button onClick={boundActions.decrement}>-</button>
            </div>
        )
    }
}
