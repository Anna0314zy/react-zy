import React from 'react';
import ReactDOM from 'react-dom';
// ref 只能引用类组件 不能引用函数式组件
class Form extends React.Component{
    //Form想操作TextInput2 里面的input 的dom
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    getFocus = () => {
        this.textInput.current.focus();
    }
    render() {
        return (
            <>
            <TextInput2 ref={this.textInput} />
            <button onClick={this.getFocus}>focus</button>
            </>
        )
    }
}
//函数式组件
// function TextInput2(props, ref) {
//   return <input ref={ref} />
// }
function TextInput2(props, ref) {
    return <input ref={ref} />
  }
// forwardRef 原理  中转站 转发ref
function forwardRef(funComponent) {
    return function(props) { // ref:{current:null}
        return funComponent(props, props.ref1)
    }
}
// forwardRef 可以用于函数式组件也可以用于类组件
// let TextInput3 = React.forwardRef(TextInput2)
TextInput2 = forwardRef(TextInput2)
//类组件
class TextInput extends React.Component{
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
}
    render() {
        return (
             <input ref={this.textInput} />
        );
    }
}
ReactDOM.render(<Form/>, document.getElementById('root'));