import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
let style = { color: 'red' };
let name = '珠峰架构';
function getName() {
  return '珠峰架构';
}
/**
 * JSX 要想使用一个变量 必须放在{}里
 * 表达式就是变量跟运算符的组合
 */
// ReactDOM.render(
  // <h1
  //   id="mytitle"
  //   className="mytitle"
  //   style={style}>
  //     hello {getName()}
  // </h1>,
//   // <React.StrictMode>
//   //   <App />
//   // </React.StrictMode>,
//   document.getElementById('root')
// );
let ele = React.createElement('h1', {

  className: "mytitle"
}, 'hello', React.createElement('span', null, 'world'));
console.log(JSON.stringify(ele));
/**
 * React就是一个普通的js对象
 *  {
  "type":"h1",
  "key":null,
  "ref":null,
  "props":{
      "className":"mytitle",
      "children":[
          "hello",
          {
              "type":"span",
              "key":null,
              "ref":null,
              "props":{
                  "children":"world"
              },
              "_owner":null,
              "_store":{

              }
          }
      ]
  },
  "_owner":null,
  "_store":{

  }
}
 */

ReactDOM.render(
  ele,
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
