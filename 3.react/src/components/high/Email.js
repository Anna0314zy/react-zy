import React, { Component } from 'react'
import WithLocal from './withLocal'
 class Email extends Component {

    render() {
        return (
            <div>
                <input defaultValue={this.props.value}/>
            </div>
        )
    }
}
export default WithLocal(Email, 'email')
