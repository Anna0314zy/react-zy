let state = {number:0};
let callbacks = [];
callbacks.push([(state)=>({number:state.number+1}), ()=> {console.log(state)}]);
callbacks.push([(state)=>({number:state.number+2}), ()=> {console.log(state)}]);
callbacks.push([(state)=>({number:state.number+3}), ()=> {console.log(state)}]);
let v;
let fns = [];
// console.log([cb,fn] = callbacks.shift());
while((v = callbacks.shift())) {
    let [cb, fn] = v;
    state = cb(state);
    fns.push(fn);
}
fns.forEach(fn=>fn());