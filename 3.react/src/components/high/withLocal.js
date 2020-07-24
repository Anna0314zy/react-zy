import React from 'react';
export default function (Component, name) {
    //Component 是包装后的对象  withAjax
    return class extends  React.Component{
        constructor() {
            super();
            this.state = {val:''}
        }
        componentDidMount() {
            this.setState({
                val:localStorage.getItem(name)
            })
        }
        render() {
            console.log(this.state.val, 'withLocal-val');
            return <Component {...this.props} val={this.state.val}/>
        }
    }
}