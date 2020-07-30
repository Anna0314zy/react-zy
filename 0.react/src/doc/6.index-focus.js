import React from 'react';
import ReactDOM from 'react-dom';
// ref 只能引用类组件 不能引用函数式组件
class Form extends React.Component{
    constructor(props) {
        super(props);
        console.log(React, 'React');
        this.textInput = React.createRef();
    }
    getFocus = () => {
        console.dir(this.textInput.current);
        this.textInput.current.focus();
        //针对类组件
    //   this.textInput.current.textInput.current.focus();
    //   console.log(this.textInput.current.textInput.current.focus)// TextInput类的实例
    }
    render() {
        return (
            <>
            {/* <TextInput3 ref={this.textInput} /> */}
            {/* ref1  原因是获取不到props.ref react内部会阻止 */}
            <TextInput3 ref1={this.textInput} />
            <button onClick={this.getFocus}>focus</button>
            </>
        )
    }
}
//函数式组件
// function TextInput2(props, ref) {
//   return <input ref={ref} />
// }
function TextInput2(props, ref1) {
    return <input ref={ref1} />
  }
// forwardRef 原理  中转站 转发ref
function forwardRef(funComponent) {
    return function(props) { // ref:{current:null}
        return funComponent(props, props.ref1)
    }
}
// forwardRef 可以用于函数式组件也可以用于类组件
// let TextInput3 = React.forwardRef(TextInput2)
let TextInput3 = forwardRef(TextInput2)
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