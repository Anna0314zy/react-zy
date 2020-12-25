export function prefix(reducers, namespace) {
    let newReducers = {};
    for(let key in reducers) {
        newReducers[namespace +'/'+key] = reducers[key];
    }
    return newReducers; 
}