
import {CALL_HISTORY_METHOD} from './constants'
export default function(path) {
    console.log(path, 'push-push')
    return {
        type: CALL_HISTORY_METHOD,
         payload: {
             method:'push',
             path
         }
    }
}