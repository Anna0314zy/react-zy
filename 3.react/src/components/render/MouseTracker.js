//跟踪计算鼠标的位置
import React, { Component } from 'react'

export default class MouseTracker extends Component {
    constructor() {
        super();
        this.state = { x: 0, y: 0 };
    }
    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }
    render() {
        return (
            <div onMouseMove={this.handleMouseMove}>
            {this.props.render({x:this.state.x, y: this.state.y})}
            </div>
        )
    }
}