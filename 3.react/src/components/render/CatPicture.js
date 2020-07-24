//跟踪计算鼠标的位置
import React, { Component } from 'react'
import MouseTracker from './MouseTracker'
function withMouseTracker(Comp) {
    return props => <MouseTracker render={data=> <Comp {...props}{...data}></Comp>}></MouseTracker>
}
 class CatPicture extends Component {
    render() {
        return (
            <div>
                <img src="http://localhost:3000/logo192.png" alt=""/>
                <p>当前鼠标的位置是x:{this.props.x}y:{this.props.y}</p>
            </div>
        )
    }
}
export default withMouseTracker(CatPicture);
// 两种写法 一个是高阶组件的写法 一个是render-props的写法