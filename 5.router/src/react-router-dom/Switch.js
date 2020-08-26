import React, { Component } from 'react'
import RouterContext from './context'
import {pathToRegexp} from 'path-to-regexp'
//匹配路由  route path component
export default class Switch extends Component {
    static contextType = RouterContext;
    render() {
        let { pathname } = this.context.location;//当前地址栏的路径
        let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
        console.log(children, 'children')
        
        for(let i = 0; i < children.length;i++) {
            let child = children[i];
            let {path='/', exact=false} = child.props;
            let paramNames = [];
            let regexp = pathToRegexp(path, paramNames,{end:exact});
            let result = pathname.match(regexp);
            if (result) {
                return child;//child 是个啥  react元素
            }
        }
        return null;
    }
}
