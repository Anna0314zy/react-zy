import React from 'react';
export default function (Component) {
    //从属性对象中 接收到一个val属性 存放着英文名  调用接口取得中文名
    return class extends  React.Component{
        constructor() {
            super();
            this.state = {value:''}
        }
        componentDidMount() {
            // this.setState({
            //     value:localStorage.getItem(name)
            // })
            //掉接口 去服务器去找中文名字
            fetch('http://localhost:3000/translation.json')
            .then(respnse => respnse.json())
            .then(res => {
                console.log(this.props.val, this.state.value, 'with-ajax');
                this.setState({value: res[this.props.val]})
            })
        }
        render() {
            return <Component {...this.props} value={this.state.value}/>
        }
    }
}