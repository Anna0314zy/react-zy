import { race, call } from "redux-saga/effects";

/**
 * 1.有时候我们同时启动多个任务 但又不想等待所有任务完成，我们只希望拿到胜利者：即第一个被reslove（或reject）的任务
 * 2.race 的另一个有用的功能是 他会自动取消那些失败的effects
 * 
 */

const delay = ms => new Promise((reslove, reject) => {
    setTimeout(() => {reslove(ms)}, ms)
})
export default function* () {
    const {a, b} = yield race({
        a:call(delay,1000),
        b:call(delay, 500)
    })
    console.log('a=', a, 'b=', b);
}