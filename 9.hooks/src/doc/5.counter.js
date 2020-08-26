import React, {createRef, forwardRef,useRef, useState, useEffect, useReducer, createContext, Component, useContext,useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

function Child(props, parentRef) {
  let inputRef = useRef();
  useImperativeHandle(parentRef, () => {
    return {
      focus() { //这个方法会传给parentRef。current
        inputRef.current.focus();
      }
    }
  });
  return (
    <>
    <input type="text" ref={inputRef}/>
    </>
  )
}
//这样写 子组件收不到保护
let ForwardChild = forwardRef(Child);

function Parent() {
  //操作child 的input 
  let [number, setNumber] = useState(0);
  const parentRef = useRef();
  function getFocus() {
    parentRef.current.focus();
    //此处的current是上面useImperativeHandle return的那个对象呀
  }
  return (
    <>
    <ForwardChild ref={parentRef}/>
    <button onClick={getFocus}>获得焦点</button>
    <button onClick={()=>setNumber(number+1)}>{number}</button>
    </>
  )
}

ReactDOM.render(
  <Parent/>,
  document.getElementById('root')
);
