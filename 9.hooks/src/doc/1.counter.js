import React, { Component, useState, memo, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
class Counter extends Component {
  state = { number: 0 }
  add = () => {
    this.setState({ number: this.state.number + 1 })
  }
  render() {
    return (
      <>
        <p>{this.state.number}</p>
        <button onClick={this.add}>+</button>
      </>
    )
  }
}
function Counter2() {
  let [number, setNumber] = useState(0);//0是初始值
  return (
    <>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </>
  )
}
//每次渲染都是独立的闭包
function Counter3() {
  let [number, setNumber] = useState(0);
  //点2下左边 点2下右边  
  function alertNumber() {
    setTimeout(() => {
      alert(number) //2 值是独立的
    }, 3000)
  }
  return (
    <>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
      <button onClick={alertNumber}>alertNumber</button>
    </>
  )
}
function Counter4() {
  let [number, setNumber] = useState(0);
  // console.log(useState(0));
  //左边2次右边2次左边1次
  function lazy() {
    setTimeout(() => {
      // setNumber(number+1) ==> 3
      setNumber(number => number + 1) // ===> 5 这个会去最新的状态
    }, 3000)
  }
  return (
    <>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
      <button onClick={lazy}>lazy</button>
    </>
  )
}
//惰性初始化 useState可以传函数 组件可以传值 在传值的基础上做加法
function Counter5(props) {
  console.log('Counter5 render')
  let [counter, setCounter] = useState(function () {
    return { number: props.number }
  });
  //如果你修改状态的时候 直接传的是老状态 则什么都不做
  return (
    <>
      <p>{counter.number}</p>
      <button onClick={() => setCounter({ number: counter.number + 1 })}>+</button>
      <button onClick={() => setCounter(counter)}>setCounter</button>

    </>
  )
}
//减少渲染次数
function Subcounter({ onClick, data }) {
  console.log('Subcounter-render')
  return (
    <button onClick={onClick}>{data.number}</button>
  )
}
//把此组件传递给memo之后 就会返回一个新的组件 新组件有了一个功能
//如果状态不变 就不会渲染
Subcounter = memo(Subcounter);
function Counter6(props) {
  console.log('Counter6-render')
  const [number, setNumber] = useState(0);
  const [name, setName] = useState('计数器');
  // const data = {number};
  const data = useMemo(() => ({ number }), [number]); // []这个是依赖项 如果这个依赖项
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
  <Counter6 />,
  document.getElementById('root')
);
