import React, { Component } from 'react'
import WithLogger from './withLogger'
//统计渲染时间
class Counter extends Component {
    calculate=() =>{
        for(let i = 0; i < 1000;i++) {
            console.log(i);
        }
    }
    render() {
        return (
            <div>
                Counter
                {this.props.name}
            </div>
        )
    }
}
export default WithLogger(Counter)
// export default Counter;