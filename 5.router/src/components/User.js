import React, { Component } from 'react'
import { Route, Link ,Redirect,Switch} from '../react-router-dom'
import UserList from './UserList'
import UserAdd from './UserAdd'
import UserDetail from './userDetail'
import MeauLink from './MeauLink'
export default class User extends Component {
    render() {
        console.log(this.props, 'user-props');
        return (
            <div className="row">
                <div className="col-md-2">
                    <ul className="nav nav-stacked">
                        <li ><MeauLink to="/user/list">用户列表</MeauLink></li>
                        <li ><MeauLink to="/user/add">添加用户</MeauLink></li>
                    </ul>
                </div>
                <div className="col-md-10">
                    {/* switch 匹配只会匹配一个 匹配上了就不再向下匹配了 */}
                    <Switch>
                    <Route path="/user/list" component={UserList}></Route>
                    <Route path="/user/add" component={UserAdd}></Route>
                    <Route path="/user/detail/:id" component={UserDetail}></Route>
                    <Redirect to="/user/list"></Redirect>
                    </Switch>
                  

                </div>

            </div>
        )
    }
}
