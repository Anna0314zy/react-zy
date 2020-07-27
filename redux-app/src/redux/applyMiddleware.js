import compose from './compose'
export default function applyMiddleware(...middleware) {
    return function(createStore) {
        return function(reducers) {
            const store = createStore(reducers);
            let dispatch = () => {
                throw Error('现在还不能用');
            }
            // middleware = middleware(store);
            let middlewareAPI  = {
                getState: store.getState,
                dispatch: (...args) => dispatch(...args)
            }
            const chain = middleware.map(middleware => middleware(middlewareAPI));
            console.log(chain, 'chain---');
            // dispatch = middleware(store.dispatch);
            dispatch = compose(...chain)(store.dispatch);
            return {
                ...store,
                dispatch
            }
        }
    }
}
// export default function logger({getState}) {
//     return function (next) {
//         return function (action) {
//             console.log('老状态', getState());
//             next(action);
//             console.log('新状态', getState());
//         }
//     }
// }