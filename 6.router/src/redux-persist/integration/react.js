
import React, { Component } from 'react';

class PersistGate extends Component {
    componentDidMount() {
        //从localstorage里获得数据 改变仓库
        console.log(this.props.persistor, 'this.props.persistor')
        this.props.persistor.initState();
    }
    render() {
        return this.props.children
    }
}


export {PersistGate}