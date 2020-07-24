import React, { Component } from 'react';
//title 和 content 一个色  主题色
// import PropTypes from 'prop-types';/
// const ThemeContext = React.createContext();//{Provider,Consumer}g
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');

var ThemeContext = React.createContext(); //手写原理
function createContext() {
    class Provider extends Component{
        static value;
        $$typeof=REACT_PROVIDER_TYPE;
        constructor(props) {
            super(props);
            Provider.value = props.value;
            this.state = {value:this.props.value}
        }
        //映射为新的状态对象
       static getDerivedStateFromProps(props, state) {
        Provider.value = props.value;
            return {value:props.props}
        }
        render() {
            return this.props.children;
        }
    }
    class Consumer extends Component{
        render() {
            return this.props.children(Provider.value);
        }
    }
    return {$$typeof:REACT_CONTEXT_TYPE,Provider}
}
class Header extends Component {
    constructor() {
        super()
    }
    render() {
        // console.log(this.context);
        return (
            <div style={{ border: '2px solid pink', padding: '5px' }}>
                <Title></Title>
            </div>
        )
    }
}
class Main extends Component {
    render() {
        return (
            <div style={{ border: '2px solid green', padding: '5px' }}>
                main
                <Content></Content>
            </div>
        )
    }
}
//函数式组件不好用ThemeContext 传递状态
// class Title extends Component {
//     static contextType = ThemeContext;
    
//     render() {
//         // this.context = Title.contextType.Provider.value;//自己写的方法才需要加上这个
//         console.log(this.context)
//         return (
//             <div style={{ border: '2px solid orange', padding: '5px', color: this.context.color }}>
//                 title
//                 name={this.context.name}
//                 age={this.context.age}
//             </div>
//         )
//     }
// }
//函数式组件没有类没有实例
function Title(props) {
    return (
        <ThemeContext.Consumer>
            {
                value => (
                    <div style={{ border: '2px solid orange', padding: '5px', color: value.color }}>
                    title
                    name={value.name}
                    age={value.age}
                </div>
        )
                
            }
        </ThemeContext.Consumer>
    )
       
}
// class Content extends Component {
//     static contextType = ThemeContext;
//     render() {
//     // this.context = Title.contextType.Provider.value; //手写的才需要写这个

//         console.log(this.context);
//         return (
//             <div style={{ border: '2px solid blue', padding: '5px', color: this.context.color }}>
//                 content
//                 <button onClick={() => this.context.setColor('red')}>变红</button>
//                 <button onClick={() => this.context.setColor('green')}>变绿</button>

//             </div>
//         )
//     }
// }
function Content() {
   return(
    <ThemeContext.Consumer>
    {
        value => (
            <div style={{ border: '2px solid blue', padding: '5px', color: value.color }}>
            content
            <button onClick={() => value.setColor('red')}>变红</button>
            <button onClick={() => value.setColor('green')}>变绿</button>

        </div>
)
        
    }
</ThemeContext.Consumer>
   )
}
class Page extends Component {
    constructor(props) {
        super();
        this.state = { color: 'gray' };
    }
    setColor = (color) => {
        this.setState({ color: color })
    }

    render() {
        let ctx = {color:this.state.color, setColor:this.setColor}
        return (
            <ThemeContext.Provider value={ctx}>
                <div style={{ border: '2px solid red', padding: '5px' }}>
                    page
                <Header>
                        {/* <Title></Title> */}
                    </Header>
                    <Main>
                        {/* <Content></Content> */}
                    </Main>
                </div>
            </ThemeContext.Provider>

        );
    }
}

export default Page;