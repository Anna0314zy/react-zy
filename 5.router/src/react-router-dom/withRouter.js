import React from 'react';
import {Route} from './index'
export default function(WrapperComponent) {
    return props => <Route component={WrapperComponent} {...props}></Route>
}