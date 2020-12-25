//<PrivateRoute path="/profile" component={Profile}/>
import {Route,Redirect} from 'react-router-dom';

export default ({render, ...rest})=>{
    // console.log('props',props);
    //render 渲染方法 用来渲染profile

    /**{history: {…}, location: {…}, match: {…}, staticContext: undefined, computedMatch: {…}, …}
children: {$$typeof: Symbol(react.element), key: null, ref: null, props: {…}, type: ƒ, …}
computedMatch: {path: "/profile", url: "/profile", isExact: true, params: {…}}
history: {length: 22, action: "PUSH", location: {…}, createHref: ƒ, push: ƒ, …}
location: {pathname: "/profile", search: "", hash: "", query: {…}, state: undefined, …}
match: {path: "/profile", url: "/profile", isExact: true, params: {…}}
render: ƒ render(props)
route: {path: "/profile", exact: true, title: "个人中心", Routes: Array(1), component: ƒ, …}
staticContext:*/
console.log(localStorage.getItem('login'),'login---');
    // return null;
    return (
<Route render={
    routeProps => {
        console.log(routeProps, 'routeProps');
   return localStorage.getItem('login') ? render(routeProps) : <Redirect to={{pathname:'/login',state:{from:location.pathname}}} />
    }
}></Route>
    )
}
    //return <Route {...rest} render={props=>{
    //    return localStorage.getItem('login')?render(props):<Redirect to={{pathname:'/login',state:{from:props.location.pathname}}}/>
    //}}/>
    //  return localStorage.getItem('login')?render(rest):<Redirect to={{pathname:'/login',state:{from:props.location.pathname}}}/>
