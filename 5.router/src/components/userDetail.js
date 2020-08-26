import React, { Component } from 'react'
import lcoal from '../local'
import local from '../local';
export default class userDetail extends Component {
    state = { user: {} };
    componentDidMount() {
        let user = this.props.location.state;
        console.log(this.props, 'props');
        if (!user) {
           let id = this.props.match.params.id;
            user = local.get(id);
        }
        this.setState({ user });
    }
    render() {
       let {user={}} = this.state;
       console.log(this.props)
        return (
            <table className="table">
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>用户名</th>
                    <th>邮箱</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
