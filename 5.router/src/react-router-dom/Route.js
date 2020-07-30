import React, { Component, Children } from 'react'
import Context from './context'
import { pathToRegexp } from 'path-to-regexp';
//匹配路由渲染  组件
export default class Route extends Component {
    static contextType = Context;
    render() {
        let { pathname } = this.context.location;
        console.log(pathname, 'pathname');
        let { path = '/', component: Component, exact = false, render, children } = this.props;
        let paramNames = [];
        let regexp = pathToRegexp(path, paramNames, { end: exact });
        let result = pathname.match(regexp);
        let props = {
            location: this.context.location,
            history: this.context.history
        }
        if (result) {
            console.log(result, 'result');
            paramNames = paramNames.map(item => item.name);
            let [url, ...values] = result;
            let params = {};
            for (let i = 0; i < paramNames.length; i++) {
                params[paramNames[i]] = values[i]
            }
            props.match = {
                params,
                path,
                url,
                isExact: url === pathname,
            }
            if (Component) {
                return <Component {...props}></Component>
            } else if (render) {
                return render(props);
            }else if(children){
                return children(props);
            }else {
                return null;
            }
        }
        if (children) {
            return children(props)
        }
        return null; // 必须是return null
    }
}
