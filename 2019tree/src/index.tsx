import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './components/tree'
import data from './data'; //数据源


ReactDOM.render(<Tree data={data}></Tree>, document.getElementById('root'))
