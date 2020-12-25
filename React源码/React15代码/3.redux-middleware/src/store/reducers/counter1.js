import *  as types from '../action-types';
export default function(state={number:0},action){
    console.log(state.number, 'state.number---counter1-------')

    switch(action.type){
        case types.ADD1:
           return {number:state.number+1};
        default:
           return state;   
    }
}