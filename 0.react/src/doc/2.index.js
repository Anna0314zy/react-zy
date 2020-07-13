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
//2  箭头 函数   或者  add 命名成（）=>
class Clock extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {date:new Date().toLocaleDateString()};
    this.state = {number: 0}
  }
  componentDidMount() {
    this.$timer = setInterval(() => {
      //setState 修改状态  重新render
      this.setState({date:new Date().toLocaleDateString()})
    }, 100)
  }
  add = () => {
    console.log(this.state.number, 'this.state.number');
    this.setState({number:this.state.number+1})
  }
  render() {
    return (
    <>
    <p>{this.state.number}</p>
    <button onClick={this.add}>+</button> 
    </>
    )
  }
 
}

ReactDOM.render(<Clock/>, document.getElementById('root'));