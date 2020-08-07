import React, { useState, useEffect, useReducer, createContext, Component, useContext } from 'react';
import ReactDOM from 'react-dom';
//每次修改完状态后要同步到浏览器的标题上
class Counter2 extends React.Component {
  state = { number: 0 }
  componentDidMount() {
    document.title = `你现在一共点击了${this.state.number}`
  }
  componentDidUpdate() {
    document.title = `你现在一共点击了${this.state.number}`
  }
  render() {
    return (
      <>
        <p>{this.state.number}</p>
        <button onClick={() => this.setState({ number: this.state.number + 1 })}>+</button>
      </>
    )
  }
}
function Counter() {
  let [number, setNumber] = useState(0);
  //effect函数是在每次渲染完成后就执行
  //每次我们重新渲染 都会生成新的effect 替换掉之前的 某种意义上讲effect更像是渲染结果的一部分-每个effect属于一次特定的渲染
  useEffect(() => {
    document.title = `你现在一共点击了${number}`
  })
  return (
    <>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </>
  )
}
function Counter3() {
  let [number, setNumber] = useState(0);
  //effect函数是在每次渲染完成后就执行
  //每次我们重新渲染 都会生成新的effect 替换掉之前的 某种意义上讲effect更像是渲染结果的一部分-每个effect属于一次特定的渲染
  useEffect(() => {
    console.log('你开启了一个新的定时器');
    const $timer = setInterval(() => {
      setNumber(number=>number+1)
    }, 1000);

    // return () => {
    //   clearInterval($timer)
    // }
  }, []) //依赖的变化是空的 不会变 然后后面的定时器 不会执行
  return (
    <>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </>
  )
}
ReactDOM.render(
  <Counter3/>,
  document.getElementById('root')
);
