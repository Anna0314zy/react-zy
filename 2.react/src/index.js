import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Counter extends React.Component{
  constructor(props) {
      super(props)
      this.state = {number:0};
  }
  //合并更新
  add() {
      this.setState({number: this.state.number+1})
      console.log(this.state);//0  延迟  合并 更新是异步的 
      this.setState({number: this.state.number+1})
      console.log(this.state);//0
      setTimeout(() => {
          this.setState({number: this.state.number+1})
      console.log(this.state);//2
      this.setState({number: this.state.number+1})
      console.log(this.state);//3
      })
  }
  render() {
    return (
        <>
        <button onClick={this.add.bind(this)}>{this.state.number}</button>
        </>
    )
}
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.

ReactDOM.render(<Counter/>,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
