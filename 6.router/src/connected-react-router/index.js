
import routerMiddleware from './routerMiddleware'
import connectRouter from './connectRouter'
import push from './push';
import ConnectedRouter from './ConnectedRouter'
export {
    routerMiddleware,//创建路由中间件的函数接受history
    connectRouter, //创建reducer的函数  接受history
    push,//用来返回一个用来跳转路径的action
    ConnectedRouter //路由容器
}