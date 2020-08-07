import React, { useReducer, createContext, Component, useContext } from 'react';
import ReactDOM from 'react-dom';
const initialState = 0;
function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { number: state.number + 1 };
    default:
      return state;
      break;
  }
}
//没有hooks的写法
let Countercontext = createContext();
// function Subcounter() {
//   return (
//     <Countercontext.Consumer>
//       {
//         value => (
//           <>
//             <p>{value.state.number}</p>
//             <button onClick={() => value.dispatch({ type: 'ADD' })}>+</button>

//           </>
//         )
//       }
//     </Countercontext.Consumer>

//   )
// }
function Subcounter() {
  const {state, dispatch} = useContext(Countercontext);
  return (
    <>
      <p>{state.number}</p>
      <button onClick={() => dispatch({ type: 'ADD' })}>+</button>

    </>

  )
}
// class Subcounter extends Component{
//   static contextTypes = Countercontext;
//   this.context = {state, dispatch};
// }

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState, () => ({ number: initialState }))
  return (
    <Countercontext.Provider value={{ state, dispatch }}>
      <Subcounter />
    </Countercontext.Provider>

  )
}
ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);
