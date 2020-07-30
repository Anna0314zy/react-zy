import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions/counter'
// console.log(actions, 'actions')
//纯ui组件
class Counter extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.increment}>+</button>
                <button onClick={this.props.decrement} >-</button>
                <button onClick={() => this.props.history.push('/')}>去首页</button>
            </div>
        )
    }
}
export default connect(
    state => {
        console.log(state)
        return state.counter;
    },
    actions
)(Counter)