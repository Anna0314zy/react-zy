import React from "react";
import { connect } from "../react-redux";
import {createSelector} from 'reselect';

import actions from "../store/actions/counter1";
// export default @connect(
//     state=>state.counter,
//     actions
// )

class Counter extends React.Component {
  render() {
    console.log('counter1 ------render', this.props);
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
const counterSelector = state=>state.counter1;

let getCounterSelector = createSelector(counterSelector,counter1=>counter1);

const mapStateToProps = state=>getCounterSelector(state);

export default connect(
  mapStateToProps,
  actions
)(Counter)