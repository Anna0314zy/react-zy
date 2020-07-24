import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor() {
        super();
        this.state = { hasErrors: false };

    }
    // 在最新的官方代码中，新增了静态方法getDerivedStateFromError用来改变ErrorBoundary.
    // js的hasError状态，
    // 而方法componentDidCatch只用于打印错误日志，新的ErrorBoundary.js写法如下：
    static getDerivedStateFromError(error){
        console.log(error)
        return {     // 返回的值会自动 调用setState，将值和state合并
            hasErrors:true
        }
    }
    // //捕获错误和信息
    // componentDidCatch(err, info) {
    //    if (err) {
    //     this.setState({
    //         hasErrors: true
    //     })
    //    }
    // }
    render() {
        if (this.state.hasErrors) {
            return <div style={{ border: '1px solid green'}}> 此组件发生未知错误，无法正常显示</div>
        } else return this.props.children;
    }
}
function Clock() {
    console.log(null.toString);
    return <div style={{ border: '1px solid green'}}>{Date.now()}</div>
}
function Counter() {
    return <div style={{ border: '1px solid pink'}}>计数器</div>
}
class Page extends Component {
    render() {
        return (
            <div style={{ border: '1px solid red', padding: '5px' }}>
                page
                <ErrorBoundary>
                    <Clock></Clock>
                </ErrorBoundary>
            <Counter/>
            </div>

        )
    }
}
export default Page;