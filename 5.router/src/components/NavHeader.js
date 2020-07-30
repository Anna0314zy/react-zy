import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
class NavHeader extends Component {
    render() {
        console.log(this.props, 'nav-header')
        return (
            <div className="navbar-heading">
                <div onClick={() => this.props.history.push('/')} className="navbar-brand">珠峰架构</div>
            </div>
        )
    }
}
export default withRouter(NavHeader);
