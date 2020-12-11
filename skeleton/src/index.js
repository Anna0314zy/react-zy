import React from 'react';
import ReactDOM from 'react-dom';
import {FixedSizeList as List} from './react-window';
// import ContentLoader from 'react-content-loader'
// let style = {
//     width: '800px',
//     height: '800px',
//     background: 'red'
// }
//
// setTimeout(() => {
//     console.log(document.getElementById('root'))
//     ReactDOM.render(<h1 style={style}>hello world</h1>, document.getElementById('root'))
//
// }, 1000)
const Row = ({ index, style }) => (
    <div style={{...style, background: getRandomColor()}} key={index}>Row {index}</div>
);

const Example = () => (
    <List
        height={150}
        itemCount={1000}
        itemSize={35}
        width={300}
    >
        {Row}
    </List>
);
ReactDOM.render(<Example />, document.getElementById('root'))
function getRandomColor() {
    //toString(16) 转换成16进制
    let rand = Math.floor(Math.random()*0xFFFFFF).toString(16).toUpperCase();
    console.log(rand);
    if (rand.length === 6) {
        return '#'+rand;
    }
    return getRandomColor();

}
