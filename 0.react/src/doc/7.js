import React from 'react';
import ReactDOM from 'react-dom';
// ref 只能引用类组件 不能引用函数式组件
class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state={text:'hello'}
        this.conRef = React.createRef();
        console.log(this.conRef);
    }
    add = () => {
        console.log(this.state.text);
        console.log(this.conRef, 'conref--');
    }
    handlchange = (event) => {
        this.setState({text:event.target.value});
    }
    //给子组件传方法  子组件调用给父组件传值
    changeText = (text) => {
        console.log(text, 'text')
        this.setState({text});
    }
    render() {
        return (
            <>
            <input value={this.state.text} onChange={this.handlchange}/>
            <Son text={this.state.text} name={this.props.name} changeText={this.changeText}/>
            <button onClick={this.add}>add</button>
            <input type="text" ref={this.conRef}/>
            </>
        )
    }
}
class Son extends React.Component{
   render() {
    return (
        <>
        <div>text:{this.props.text}</div> 
        <input ref="myInput"></input>
        <button onClick={()=>this.props.changeText(this.refs.myInput.value)}>改变状态</button>
        </>
    )
   }
}
ReactDOM.render(<Form/>, document.getElementById('root'));