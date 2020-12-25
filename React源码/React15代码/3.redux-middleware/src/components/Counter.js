import React from "react";
import { connect } from "../react-redux";
import {createSelector} from 'reselect';
import actions from "../store/actions/counter";
import _ from 'lodash';
// export default @connect(
//     state=>state.counter,
//     actions
// )

class Counter extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props, nextProps, 'this.props, nextProps');
    // return true;
    let keys = Object.keys(nextProps);
    for(let i=0;i<keys.length;i++){
        let key = keys[i];
        if(!_.isEqual(this.props[key] , nextProps[key])){
            return true;
        } 
        //  if(!is(this.state[key],nextState[key])){
        //     return true;
        // }
    }
    return false;
 }
  render() {
    console.log('counter444 ------render');
    return (
     
      <div>
        <p>{this.props.number}</p>
        <button onClick={this.props.add}>+</button>
        <button onClick={this.props.asyncAdd}>async+</button>
        <button onClick={this.props.promiseAdd}>promise+</button>
      </div>
    );
  }
}
const counterSelector = state=>state.counter;

let getCounterSelector = createSelector(counterSelector,counter=>counter);

const mapStateToProps = state=>getCounterSelector(state);

export default connect(
  mapStateToProps,
  actions
)(Counter)