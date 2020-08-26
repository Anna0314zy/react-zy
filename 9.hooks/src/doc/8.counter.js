import React, { useLayoutEffect, useEffect, useState,memo,useMemo,useCallback} from 'react';
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
//减少渲染次数
function Subcounter({ onClick, data }) {
  console.log('Subcounter-render')
  return (
    <button onClick={onClick}>{data.number}</button>
  )
}
Subcounter = memo(Subcounter);
function Counter6(props) {
  console.log('Counter6-render')
  const [number, setNumber] = useState(0);
  const [name, setName] = useState('计数器');
  const data = useMemo(() => ({ number }), [number]); // []这个是依赖项 如果这个依赖项
  //data  {number: 1}
  const addClick = useCallback(()=>{
    setNumber(number + 1)
  },[number])
  return (
    <>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <Subcounter data={data} onClick={addClick} />
    </>
  )
}
ReactDOM.render(
  <>
  <Counter1/>
  <Counter2/>
  <Counter6/>
  </>,
  document.getElementById('root')
);

