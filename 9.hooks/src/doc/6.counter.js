import React, { useLayoutEffect, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
function UseLayoutEffectComponent() {
   const [color, setcolor] = useState('red');
      //useLayoutEffect
   //会在所有的DOM变更之后同步调用effect
   //可以用他来读取DOM布局并同步触发重渲染
   //在浏览器执行绘制之前useLayoutEffect内部的更新将同步刷新
   //尽可能使用标准的useEffect 以避免阻塞视图更新
   useLayoutEffect(() => {
    // alert('useLayoutEffect-COLOR=='+color);
    console.log('useLayoutEffect-COLOR==', color);
    document.getElementById('myDiv').style.backgroundColor='pink'//页面永远是pink
  })
   
   useEffect(() => {
     console.log('useEffect-COLOR==', color);
   })

   return (
     <>
     <div id="myDiv" style={{backgroundColor:color}}>颜色</div>
     <button onClick={() => setcolor('red')}>红</button>
     <button onClick={() => setcolor('yellow')}>黄</button>

     <button onClick={() => setcolor('blue')}>蓝</button>

     </>
   )
}

ReactDOM.render(
  <UseLayoutEffectComponent/>,
  document.getElementById('root')
);
