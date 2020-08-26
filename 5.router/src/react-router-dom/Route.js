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
        /** result 没有动态路由的时候  paramNames是个【】
         * ["/user/detail/1597158679806", "1597158679806", index: 0, input: "/user/detail/1597158679806", groups: undefined]
            0: "/user/detail/1597158679806"
            1: "1597158679806" //动态路由的时候有
            groups: undefined
            index: 0
            input: "/user/detail/1597158679806"
            length: 2
         */
        /**  result 的值 有动态路由 
         * ["/", index: 0, input: "/user/detail/1597158679806", groups: undefined]
        0: "/"
        groups: undefined
        index: 0
        input: "/user/detail/1597158679806"
        length: 1
        __proto__: Array(0)
         */
        /**
         *  paramNames--- 数组对象--这个数组可以拿到传的动态路由的key
            [{…}]
            0: 
            modifier: ""
            name: "id"
            pattern: "[^\/#\?]+?"
            prefix: "/"
            suffix: ""
            __proto__: Objectlength: 1__proto__: Array(0) 
         */
        let props = {
            location: this.context.location,
            history: this.context.history
        } // 传给组件
        if (result) {
            paramNames = paramNames.map(item => item.name);// ['id']
            let [url, ...values] = result; // result第一个参数是url
            let params = {};
            for (let i = 0; i < paramNames.length; i++) {
                params[paramNames[i]] = values[i]
            }
            // paramNames
            /**
             * :
              modifier: ""
              name: "id"
              pattern: "[^\/#\?]+?"
              prefix: "/"
              suffix: ""
             */
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
