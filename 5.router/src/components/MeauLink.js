import React from 'react';
import { Route, Link } from 'react-router-dom';
// 如果当前地址栏的路径跟自己匹配的话 加一个背景色
//在Route要想渲染指定内容有三种方式 component render children
// component render 路径匹配时渲染
// children 路劲不匹配也要渲染
export default function({to, exact, children}) {
    // const {to, exact, children} = props; // children 就是添加用户
    // console.log(to, exact, children, 'meau-link')
    console.log('meau-link-children', children)
    return (
        <Route path={to} exact={exact} children={
        props => {
            // console.log('meaulin', props, props.match ? 'active': '', 'active');
           return <Link className={props.match ? 'active': ''} to={to}>{children}</Link>
        }
        }></Route>
    )
}