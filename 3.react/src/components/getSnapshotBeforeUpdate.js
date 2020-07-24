import React, { Component } from 'react';
// 它的含义是在React更新Dom元素之前，获取一个快照，它返回的结果将作为componentDidUpdate的第三个参数。一般的用法就是获取更新前的DOM
class GetSnapshotBeforeUpdate extends Component {
    constructor(props) {
        super();
        this.wrapper = React.createRef();
        this.state = {messages:['2','1','0']}
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({messages: [this.state.messages.length, ...this.state.messages]})
        },1000)
    }
    getSnapshotBeforeUpdate() {
        //返回更新前的内容高度 
        return this.wrapper.current.scrollHeight; //给下面的prevScrollHeight
    }
    //组件更新完毕
    componentDidUpdate(prevProps, prevState, prevScrollHeight) {
        this.wrapper.current.scrollTop = 
        this.wrapper.current.scrollTop +(this.wrapper.current.scrollHeight -prevScrollHeight);
    }
    //1.更新前记录内容的高度  300px 
    // 2.更新后  scrollTop = scrollTop +(现在的内容高度 - 300px)
    render() {
        let style = {
            height:'100px',
            width:'200px',
            border:'1px solid red',
            overflow: 'auto'
        }
        return (
            <ul style={style} ref={this.wrapper}>
                {
                    this.state.messages.map((message, idx) => <li key={idx}>{message}</li>)
                }
            </ul>
        );
    }
}

export default GetSnapshotBeforeUpdate;