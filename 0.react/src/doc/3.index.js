import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 页面分成若干独立的部分 单独编写 单独维护
 * 1、一个返回普通React元素的函数就是一个合法的React组件
 * 2.组件需要一个根元素必须
 * 组件的名称必须要大写
 * 1.收集属性对象 props {}
 * 2.会把props对象传入Welcome函数  并得到一个返回值
 */
//函数组件  推荐使用函数组件  写完就销毁了  
// function Welcome({name, age}) {
// return <h1>hello{name} {age}</h1>
// }
// 1 this.add.bind(this)
//1.ref 字符串
//2  箭头 函数   或者  add 命名成（）=>
//即将废弃以下
class Sum extends React.Component {
  componentDidMount() {
   
  }
  add = () => {
    let numA = this.refs.numA.value;
    let numB = this.refs.numB.value;
    let result = parseFloat(numA) + parseFloat(numB);
    this.refs.result.value = result;
  }
  render() {
    return (
    <> 
    <input ref="numA"></input>+
    <input ref="numB"></input><button onClick={this.add}>等于</button>
    <input ref="result"></input>
    </>
    )
  }
}
class Sum1 extends React.Component {
  componentDidMount() {
   
  }
  add = () => {
    let numA = this.numA.value;
    let numB = this.numB.value;
    let result = parseFloat(numA) + parseFloat(numB);
    this.result.value = result;
  }
  render() {
    return (
    <> 
    <input ref={inst => this.numA = inst}></input>+
    <input ref={inst => this.numB = inst}></input><button onClick={this.add}>等于</button>
    <input ref={inst => this.result = inst}></input>
    </>
    )
  }
 
}
class Sum2 extends React.Component {
  constructor(props) {
    super(props);
    this.numA = React.createRef();//把真实dom给了current
    this.numB = React.createRef();
    this.result = React.createRef();
  }
  componentDidMount() {
   
  }
  add = () => {
    let numA = this.numA.current.value;
    let numB = this.numB.current.value;
    let result = parseFloat(numA) + parseFloat(numB);
    this.result.current.value = result;
  }
  render() {
    return (
    <> 
    <input ref={this.numA}></input>+
    <input ref={this.numB}></input><button onClick={this.add}>等于</button>
    <input ref={this.result}></input>
    </>
    )
  }
 
}
ReactDOM.render(<Sum2/>, document.getElementById('root'));