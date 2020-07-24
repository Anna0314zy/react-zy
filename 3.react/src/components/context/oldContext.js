import React, { Component } from 'react';
//title 和 content 一个色  主题色
import PropTypes from 'prop-types';

class Header extends Component {
   constructor() {
       super()
   }
    // //定义子上下文对象的属性和类型
    static childContextTypes = {
        name: PropTypes.string,
        age:PropTypes.number
        
    }
     //返回或者说定义真正的子上下文
     getChildContext() {
        return {
        age:10,
        name:'Header'
        }

    }
    render () {
        // console.log(this.context);
        return(
            <div style={{border:'2px solid pink', padding:'5px'}}> 
                <Title></Title>
            </div>
        )
    }
}
class Main extends Component {
    render () {
        return(
            <div style={{border:'2px solid green', padding:'5px'}}>
                main
                <Content></Content>
            </div>
        )
    }
}
class Title extends Component {
    // 我要获取哪些上下文对象
    static contextTypes = {
        color: PropTypes.string,
        name:PropTypes.string,
        age:PropTypes.number
    }
    render () {
        console.log(this.context)
        return(
            <div style={{border:'2px solid orange', padding:'5px', color:this.context.color}}>
                title
                name={this.context.name}
                age={this.context.age}
            </div>
        )
    }
}
class Content extends Component {
    static contextTypes = {
        color: PropTypes.string,
        name:PropTypes.string,
        age:PropTypes.number,
        setColor:PropTypes.func
    }
    render () {
        return(
            <div style={{border:'2px solid blue', padding:'5px', color:this.context.color}}>
                content
                <button onClick={() => this.context.setColor('red')}>变红</button>
                <button onClick={() => this.context.setColor('green')}>变绿</button>

            </div>
        )
    }
}
class Page extends Component { 
    constructor(props) {
    super();
    this.state ={color: 'gray'};
}

    //定义子上下文对象的属性和类型
    static childContextTypes = {
        color: PropTypes.string,
        setColor: PropTypes.func
    }
    //返回或者说定义真正的子上下文
    getChildContext() {
        return {
        color: this.state.color,
        setColor: this.setColor
        }

    }
    setColor = (color) => {
        this.setState({color:color})
    }
   
    render() {
        return (
            <div style={{border:'2px solid red', padding:'5px'}}>
                page
                <Header>
                    {/* <Title></Title> */}
                </Header>
                <Main>
                    {/* <Content></Content> */}
                </Main>
            </div>
        );
    }
}

export default Page;