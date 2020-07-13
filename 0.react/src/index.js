import React from 'react';
import ReactDOM from 'react-dom';
// ref 只能引用类组件 不能引用函数式组件
class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {number: 0, name: 'zy'};
    }
    //state 异步更新
    add = () => {
    //   this.state.number = this.state.number + 1;
    //   this.setState({number:this.state.number+1});
    //   console.log(this.state.number); // 0  this.state.number读到的是0 
    //   this.setState({number:this.state.number+1});
    //   console.log(this.state.number);// 0
    //当调用setState的时候 其实状态并没有改变 而是放入一个队列中
      this.setState((state)=>({number:state.number+1}), () => {
          console.log(this.state); // 2
      });
      console.log(this.state.number);// 0
      this.setState((state)=>({number:state.number+1}))
      console.log(this.state.number);// 0
    }
    render() {
        return (
            <>
            <p>{this.state.name}{this.state.number}</p>
            <button onClick={this.add}>+</button>
            </>
        )
    }
}
ReactDOM.render(<Form/>, document.getElementById('root'));