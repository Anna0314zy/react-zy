import React, { Component } from 'react'
import ReduxContext from './context';
//向下层组件提供store
export default class Provider extends Component {
  render() {
    console.log(this.props.store, 'this.props.store-redux-Provider');
    return (
    <ReduxContext.Provider value={{ store: this.props.store }}>
      {this.props.children}
    </ReduxContext.Provider>
    )
  }
}
