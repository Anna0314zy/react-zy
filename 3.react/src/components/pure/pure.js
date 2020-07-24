import React, { PureComponent, Component } from 'react'
// import React from 'react'
// import PureComponent from './PureComponent.js'
class Title1 extends PureComponent {
    // constructor(props) {
    //     super()
    // }
    render() {
        console.log('Title -render');
        return <div>{this.props.title}</div>
    }
}
function Title(props) {
    console.log('Title1 -render');
    return <div>{props.title}</div>
}
Title = memo(Title);
function memo(FuncComponent) {
    return class  extends PureComponent{
        render() {
            console.log(this, this.props)
            return <FuncComponent {...this.props}/>
        }
    }
}
class Counter extends PureComponent {
    // constructor(props) {
    //     super()
    // }
    render() {
        console.log('Counter -render');
        return <div>{this.props.number}</div>
    }
}
export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { title: '计数器', number: { count: 0 } };
        this.inputRef = React.createRef();
    }
    add = () => {

        //必须先构建一个新的对象  如果不构建一个新对象  pure不会渲染的
        // this.setState({ number: this.state.number })
        this.setState({ number: { count: this.state.number.count + parseInt(this.inputRef.current.value) } })
    }
    render() {
        console.log('app -render');
        return (
            <div>
                <Title title={this.state.title}></Title>
                <Counter number={this.state.number.count} />
                <input ref={this.inputRef} />
                <button onClick={this.add}>+</button>
            </div>
        )
    }
}
