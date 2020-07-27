// let logger = store => dispatch => action => {
//     console.log('老状态', store.getState());
//     dispatch(action);
//     console.log('新状态', store.getState());
// }
// export default logger;
export default function logger({getState}) {
    return function (next) {
        return function (action) {
            console.log('老状态2', getState());
            next(action);
            console.log('新状态2', getState());
        }
    }
}
