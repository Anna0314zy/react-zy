const PERSIST_INIT = 'PERSIST_INIT';

//persistedReducer = persistReducer(persistConfig, reducers)
export default function persistReducer(persistConfig, reducers) {
    let key = `persist:${persistConfig.key}`;
    let isInited =false;
    return function (state, action) {
        switch (action.type) {
            case PERSIST_INIT:
                isInited = true;
                let value = persistConfig.storage.get(key);
                state = JSON.parse(value);
                return state;
            default:
                console.log(isInited, 'isInited');
                if (isInited) {
                    state = reducers(state, action);
                    persistConfig.storage.set(key, JSON.stringify(state));
                    return state;
                }else {
                    console.log(reducers(state, action), 'reducers(state, action)')
                    return reducers(state, action);
                }
               
        }
    }
}