import React, {createRef, forwardRef,useRef, useState, useEffect, useReducer, createContext, Component, useContext,useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
let myInput;
// function Child() {
//   const inputRef = useRef();//useRef 和 createRef 的区别  前者是旧的永远是一个  后者是新的 每次都创建新的
//   console.log('inputRef === myInput', inputRef === myInput)
//   myInput = inputRef;
//   function getFocus() {
//     inputRef.current.focus();
//   }
//   return (
//     <>
//     <input type="text" ref={inputRef}/>
//     <button onClick={getFocus}>获得焦点</button>
//     </>
//   )

// }
function Child(props, ref) {
  //函数式组件不能this.inputRefs.current.
  return (
    <>
    <input type="text" ref={ref}/>
    </>
  )
}
let ForwardChild = forwardRef(Child);

function Parent() {
  //操作child 的input 
  let [number, setNumber] = useState(0);
  const inputRef = useRef();
  function getFocus() {
    inputRef.current.focus();
  }
  return (
    <>
    <ForwardChild ref={inputRef}/>
    <button onClick={getFocus}>获得焦点</button>
    <button onClick={()=>setNumber(number+1)}>{number}</button>
    </>
  )
}

ReactDOM.render(
  <Parent/>,
  document.getElementById('root')
);
