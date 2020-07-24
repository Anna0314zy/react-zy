import React, { Component } from 'react'
class TodoItems extends Component{
    //render方法只能有一个顶层div
    render() {
        return(
        //    <React.Fragment>
        //        <div></div>
        //    </React.Fragment>
        this.props.items.map((item,idx)=> <p key={idx}>{item}</p>)
        )
    }
}
export default class Fragment extends Component {
    constructor() {
        super();
        this.state = {items:['a', 'b', 'c']}
    }
    render() {
        return (
            <div>
                <input type="text"/><button>添加</button>
                <TodoItems items={this.state.items}></TodoItems>
            </div>
        )
    }
}
