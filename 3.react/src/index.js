import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import NewContext from './components/context/newContext1'
// import Pure from './components/pure/pure'
// import Logger from './components/high/Logger'
// import UserNameInput from './components/high/UserNameInput'
// import Email from './components/high/Email' 
// import MouseTracker from './components/render/MouseTracker'
// import Picture from './components/render/CatPicture'
// import Fragment from './components/fragement/Fragment'
import Page from './components/ErrorBoundary'
// let props = {
//   name: 'ze', //字符串必填
//   age: 19, //数字  必填 不能小于18岁
//   gender:'male', //只能是male female
//   isMarried: true, //是否已婚
//   hobby:['smoking', '’drinking'], //字符床数组
//   position:{x:100,b:100, c:['rr']} // x y 两个属性的对象
// }
ReactDOM.render(
  <>
  {/* <MouseTracker render={(props) => <Picture {...props}></Picture>}>
  </MouseTracker> */}
  <Page/>
  </>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </,>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
