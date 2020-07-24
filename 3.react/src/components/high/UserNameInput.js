import React, { Component } from 'react'
import withAjax from './withAjax';
import withLocal from './withLocal';
 class UserNameInput extends Component {
    render() {
        return (
            <div>
                <input defaultValue={this.props.value}/>
            </div>
        )
    }
}
// export default WithLocal(UserNameInput, 'username');
let UserNameInputWithAjax = withAjax(UserNameInput);
let UserNameInputWithLocal = withLocal(UserNameInputWithAjax, 'username')
export default UserNameInputWithLocal;

