import React from 'react';
import ReactDOM from 'react-dom';
// ref 只能引用类组件 不能引用函数式组件
class Form extends React.Component{
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    getFocus = () => {
      this.textInput.current.textInput.current.focus();
      console.log(this.textInput.current.textInput.current.focus)// TextInput类的实例
    }
    render() {
        return (
            <>
            <TextInput3 ref={this.textInput} />
            <button onClick={this.getFocus}>focus</button>
            </>
        )
    }
}

function TextInput2(props, ref) {
  return <input ref={ref} />
}
let TextInput3 = React.forwardRef(TextInput2)
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