// rcc 快捷键
import React, { Component } from 'react';

export default class Counter extends Component {
    constructor(props) {
        super();
        this.state = {number:0}
    }
    // static getDerivedStateFromProps() {

    // }
    add = ()=> {
        this.setState({number:this.state.number+1})
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={this.add}>+</button>
                <SubCounter number={this.state.number}></SubCounter>
            </div>
        );
    }
}

class SubCounter extends Component {
    constructor(props){
        super();
        this.state = {number:0}
    }
    //根据新的属性对象派生状态对象 新的属性对象 和旧的状态对象
    //会映射为state状态 prevState 上一个状态
    static getDerivedStateFromProps(nextProps, prevState) {
        //会替换状态
        // return{date:Date.now()} // 可以通过this.state找到该属性
        if (nextProps.number%2===0) {
            console.log(prevState.number, 'prevState.number')
            return {number:prevState.number+nextProps.number*2}
        }else {
            console.log(prevState.number, 'prevState.number')
            return {number:prevState.number+nextProps.number*3}
        }
    }
    render() {
        return (
            <div>
                <p>{this.state.number}{this.state.date}</p>
            </div>
        );
    }
}
