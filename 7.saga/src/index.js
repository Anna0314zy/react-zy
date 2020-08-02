
import store from './store'

import React from 'react';
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import Login from './components/Login'
import Counter from './components/Counter'

ReactDOM.render(
    <Provider store={store}>
        <Login/>
        <Counter/>
    </Provider>,
    document.getElementById('root'))