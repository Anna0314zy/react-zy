import React, { useLayoutEffect, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
//自定义hook 复用状态逻辑 复用的不是状态本身 只能用于函数式组件
//只要一个方法 方法名的前缀是use开头 并且在函数内使用了hooks 那么他就是一个自定义hook
function useNumber() {
  let [number, setNumber] = useState(0);
  useEffect(() => {
    setInterval(() =>{
      setNumber(number => number+1)
    },1000);
  },[])
  return [number, setNumber];
}
function Counter1() {
  let [number, setNumber] = useNumber();
return <div><button onClick={()=>setNumber(number+1)}> {number}</button></div>
}
function Counter2() {
  let[number, setNumber] = useNumber();
return <div>{number}</div>
}
ReactDOM.render(
  <>
  <Counter1/>
  <Counter2/>
  </>,
  document.getElementById('root')
);

