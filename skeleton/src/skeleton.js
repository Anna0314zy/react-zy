import React from 'react';
import ReactDOM from 'react-dom';
import ContentLoader from 'react-content-loader'
import ReactDomServer from 'react-dom/server'
//把一个组件渲染成一个静态的html字符串 ContentLoader是一个svg
let  html = ReactDomServer.renderToStaticMarkup(<ContentLoader />);
export default html;

