import * as types from '../../action-types';
export default  {
  add(){
    return {type:types.ADD1, payload: 10};
  },
  minus(){
    return {type:types.MINUS1};
  }
}