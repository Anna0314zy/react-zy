import React , {Component} from 'react'
export default class LifeCycle extends Component {
    //静态属性
    static defaultProps = {
        name: '计数器'
    }
    constructor(props) {
        super(props)
        this.state = {number:0}
        console.log('1初始化')
    }
    //渲染过程中react 16 后可能会执行多次 不建议请求接口操作
    //react 16之后 有优化  
    //如果ssr 客户端一次 服务端一次 而 componentDidMount 只有一次
    //componentWillMount
    componentWillMount() {
        console.log('2组件将要挂载')
    }
    //一般在这里做异步操作 请求接口 永远只有一次
    componentDidMount() {
        console.log('componentDidMount', '4组件挂载完成')
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps, nextState, 'nextProps, nextState');
        console.log('5shouldComponentUpdate询问是否需要更新')
        return true;
    }
    componentWillUpdate() {
        console.log('6componentWillUpdate组件将要更新')
    }
    componentDidUpdate() {
        console.log('7componentDidUpdate组件更新完毕')
    }
    add = ()=> {
        this.setState({number:this.state.number+1})
    }
    render() {
        console.log('3渲染')
        return (
            <div style={{border:'5px solid red'}}>
                <p>{this.state.number}</p>  
                <div></div>
                <button onClick={this.add}>+</button>
                {this.state.number%2===0 && <SubCounter number={this.state.number}></SubCounter>}
            </div> 
                
        )
    }
}
class SubCounter extends Component {
    constructor(props) {
        super(props)
        this.state = {number:0}
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps, nextState, 'nextProps, nextState');
        if (nextProps.number % 3 == 0) {
            return true
        }else {
            return false
        }
    }
    //组件收到新的属性
    componentWillReceiveProps() {
        console.log('子组件componentWillReceiveProps 将要接收新的属性')
    }
    componentWillUnmount() {
        console.log('子组件componentWillUnmount 将要卸载')
    }
    render() {
        console.log('SubCounter render')
        return (
            <div style={{border:'1px solid green'}}>
                <p>{this.props.number}</p>
            </div>
        )
    }
}
