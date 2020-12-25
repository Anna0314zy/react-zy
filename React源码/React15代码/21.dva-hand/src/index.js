import React from 'react';
import dva,{connect} from './dva';
import {Router,Route,Link,routerRedux} from './dva/router';
import {createBrowserHistory} from 'history';
//import createLoading from 'dva-loading';
//import logger from 'redux-logger';
function delay(ms){
    return new Promise(function(resolve){
        setTimeout(() => {
            resolve();    
        },ms);
    });
}
let history = createBrowserHistory();
function logger({getState,dispatch}){
   return function(next){
       return function(action){
           console.log('老状态',getState());
           next(action);
           console.log('新状态',getState());
       }
   }
}
const SHOW = 'SHOW';//显示
const HIDE = 'HIDE';//隐藏
// namespace=loading
let initialLoadingState = {
    global:false,
    effects:{},
    models:{}
}
let app = dva({
    history, //自定义history对象
   initialState:{counter:{number:5}},
   onError:(error)=>alert(error),//当effect执行错误的时候会走到这里
   onAction:[logger],//可以支持中间件 也可能是中间件的数组
   //当仓库中的状态发生改变的时候执行次函数
   onStateChange:state=>localStorage.setItem('state',JSON.stringify(state)),
   //用来增强reducer
   onReducer:reducer=>(state,action)=>{//它其实是对reducer的封装或改进
     console.log('准备要执行reducer了!');
     return reducer(state,action);
   },
   //封装effect执行

  /** onEffect: (effect, {put}, model, actionType) => {
      const {namespace} = model; //增强effect
      return function* (...args) {
          yield put({type: SHOW, payload: {namespace, actionType}});
          yield effect(...args);
          yield put({type: HIDE, payload: {namespace, actionType}});

      }
   },
   //额外的reducer对象
   extraReducers: {
       //当像仓库派发动作的时候
     loading(state=initialState, {type, payload}) {
        
     }
   },
   */
  //额外的增强器 用来增强createstore
   extraEnhancers:[StoreCreator=>{
       return StoreCreator;
   }]
});
function createLoading(){
    return {
 onEffect:(effect,{put},model,actionType)=>{
       const {namespace} = model;
       return function*(...args){
           yield put({type:SHOW,payload:{namespace,actionType}});
           yield effect(...args);
           yield put({type:HIDE,payload:{namespace,actionType}});
       }
   },
   extraReducers:{
       //global:false,effects:{},models:{}
       loading(state=initialLoadingState,{type,payload}){
           const {namespace,actionType} = payload||{};
           switch(type){
               case SHOW:
                 return {
                   global:true,//只要有一个effect执行 就为true
                   models:{...state.models,[namespace]:true},
                   effects:{...state.effects,[actionType]:true}
                 };
               case HIDE:
                 let effects = {...state.effects,[actionType]:false};
                 let modelStatus = Object.keys(effects).filter(item=>item.startsWith(namespace+'/')).some(item=>effects[item]);
                 let models = {...state.models,[namespace]:modelStatus};
                 let global = Object.keys(models).some(namespace=>models[namespace]);
                 return {global,models,effects};   
               default:
                 return state;  
           }
       }
   }
    }
}
app.use(createLoading());
app.model({
    namespace:'counter',
    state:{number:0},
    reducers:{
        add(state,{payload}){
            return {number:state.number+(payload||1)};
        }
    },
    //监听takeevery 
    effects:{
        *asyncAdd(action,{call,put}){
            yield call(delay,1000);
            yield put({type:'add'});
            //throw new Error('asyncAddError'); 这样捕获错误
        },
        *goto({payload:{pathname}},{call,put}){
            yield put(routerRedux.push(pathname));//connected-react-router
        }
        //支持自定义的effect 但是基本都没人这样用哦
        // addWatcher: [
        //     function *({take, put, call}) {
        //         for(let i = 0; i < 3; i++) {
        //             const {payload} = yield take('counter/addWatcher');
        //             yield call(delay, 1000);
        //             yield put({type:'counter/add', payload})
        //         }
        //         console.log('已经加到最大值了')
        //     },
        //     {type:'watcher'}//监听器
        // ]
    },
    subscriptions:{
        setup(){
            console.log('start subscriptions')
        }
    }
});
const Counter = connect(state=>state.counter)(
    props=>(
        <>
          <p>{props.number}</p>
          <button onClick={()=>props.dispatch({type:'counter/add',payload:2})}>+</button>
          <button onClick={()=>props.dispatch({type:'counter/asyncAdd'})}>异步加1</button>
           <button onClick={()=>props.dispatch({type:'counter/goto',payload:{pathname:'/'}})}>跳转到首页</button>
           <button onClick={()=>props.dispatch({type:'counter/addWatcher',payload: 1})}>跳转到首页</button>
        </>
    )
)
const Home = ()=><div>首页</div>
app.router(({history})=>(
   
       <Router history={history}>
            <>
          <Link to="/">首页</Link><br/><Link to="/counter">计数器</Link>
          <Route path="/" component={Home}/>
          <Route path="/counter" component={Counter}/>
        </>
       </Router>

));
app.start('#root');
//antdesignpro dva+antdesign
//dva 如何跟 umi 结合使用? dva 跟umi结合使用后，还用写 router 吗
//约定式路由
//create-react-app roadhog umi dva
//create-react-app内置了webpack配置的脚手架
//roadhog 相当于 一个可配置的create-react-app
//umi=roadhog+路由系统
//用了dva是不是react的中间件的库就永不了了？ 当然不是，可以/
//redux-persist
window.getState = app._store.getState;