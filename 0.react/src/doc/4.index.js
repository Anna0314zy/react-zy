import React from './react';
import ReactDOM from './react-dom';
/**
 * 页面分成若干独立的部分 单独编写 单独维护
 * 1、一个返回普通React元素的函数就是一个合法的React组件
 * 2.组件需要一个根元素必须
 * 组件的名称必须要大写
 * 1.收集属性对象 props {}
 * 2.会把props对象传入Welcome函数  并得到一个返回值
 */
//函数组件  推荐使用函数组件  写完就销毁了  
// function Welcome({name, age}) {
// return <h1>hello{name} {age}</h1>
// }

//这种会返回一个当前的实例 类组件  
class Welcome extends React.Component {
    constructor(props) {
      super(props); // 这里会把props挂载到实例的props
    }
    render() {
      //空标签编译后同等于React.Fregrement  片段
      //这里取值必须是this.prop
      return React.createElement('h1', {
        id: 'welcome'
      }, this.props.name, this.props.age)
    }
  }
    // let data = { name: 'zhufeng', age: 10 };
    // let ele = React.createElement('h1', {
    //   className: 'title',
    //   style: {
    //     color: 'red',
    //     fontSize: '20px'
    //   }
    // }, 'hello', React.createElement('span', null, 'world'),'hellos', React.createElement('span', null, 'world'));
    // function Welcome(props) {
    //   return <h1>hello{props.name} {props.age}</h1>
    //   }

    let ele = React.createElement(Welcome, {
      name: 'zs',
      age: 17
    });
    ReactDOM.render(ele, document.getElementById('root'));