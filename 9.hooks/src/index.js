import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Counter extends Component{
  state = {number:0}
  add = () => {
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
ReactDOM.render(
  <Counter/>,
  document.getElementById('root')
);
