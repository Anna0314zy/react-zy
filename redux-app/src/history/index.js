// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
import createStore from '../redux/createStore';
// import {createStore} from 'redux';
let initState = 0;
let INCREMENT ='INCREMENT';
let DECREMENT = 'DECREMENT';

//在redux中 动作是有规定的 规定必须有一个不为undefined type属性 用来表示动作类型
function reducer(state=initState, action) {
  console.log(action, action.type, action.type==='INCREMENT')
   switch(action.type) {
     case 'INCREMENT':
     return state+1;
     case 'DECREMENT':
      return state-1;
      default:
        console.log(state);
        return state;
     
   }
}
let store = createStore(reducer);
let couterValue = document.getElementById('counter-value');
let incrementBtn = document.getElementById('increment-btn');
let decrementBtn = document.getElementById('decrement-btn');
function render() {
  console.log(couterValue);
  couterValue.innerHTML = store.getState();
}
render();
//订阅维持3秒钟
let unsubscribe = store.subscribe(render); //订阅维持3秒钟
setTimeout(() => {
  unsubscribe();//取消订阅
}, 3000)
incrementBtn.addEventListener('click', function() {
  store.dispatch({type:INCREMENT})
  // render();
})

