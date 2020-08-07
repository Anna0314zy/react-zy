import React, { useLayoutEffect, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

class Counter extends React.Component{
  state = {number:0};
  add = () => {
    this.setState({number:this.state.number+1});
  }
  componentWillMount() {
    setInterval(() => this.setState({number:this.state.number+1}), 1000)
  }
  render() {
    return this.props.render({number:this.state.number});
  }
}
//想复用上面的逻辑
function withCounter(Component) {
  return class Counter extends React.Component{
    state = {number:0};
    add = () => {
      this.setState({number:this.state.number+1});
    }
    componentWillMount() {
      setInterval(() => this.setState({number:this.state.number+1}), 1000)
    }
    render() {
      return (
        <>
        <Component number={this.state.number}></Component>
        </>
      )
    }
  }
}
class App1 extends React.Component{
  render() {
    return (
      <>
      <button>{this.props.number}</button>
      </>
    )
  }
}
App1 = withCounter(App1)
class App2 extends React.Component{
  render() {
    return (
      <>
       <button>{this.props.number}</button>
      </>
    )
  }
}
App2 = withCounter(App2)
ReactDOM.render(
  <>
  <Counter render={props=><p>{props.number}</p>}/>
  <Counter render={props=><button>{props.number}</button>}/>
  </>,
  document.getElementById('root')
);
//复用逻辑 1.高阶组件  2.render-props
