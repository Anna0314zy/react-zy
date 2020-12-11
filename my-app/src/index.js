import React from 'react';
import ReactDOM from 'react-dom';
// import ContentLoader from 'react-content-loader'
let style = {
    width: '100%',
    height: '100%',
    background: 'red'
}
console.log(style)
setTimeout((() => {
    ReactDOM.render(
        <div>wowow</div>,
        document.getElementById('root')
    );
}), 1000)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
