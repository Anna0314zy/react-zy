import { call } from "./effects";

//返回一个中间件
export default function createSagaMiddleware() {

    function createChannel() { //管道逻辑
        let observer = {};
        function subscribe(actionType, callback) {
            console.log(observer, 'oberver');
            observer[actionType] = callback; //订阅
            // observer[actionType] = observer[actionType] || [];
            // observer[actionType].push(callback);
        }
        function publish(action) {
            if (observer[action.type]) {
                //先删再绑定
                console.log('publish');
                let next = observer[action.type];//把下次订阅完成才结束
                delete observer[action.type];
                next(action);
                // nexts.forEach(next => next(action));
                // console.log('observer-----', observer)
                //此处是个难点 一点更要保证generator执行下去
                //
                // observer[action.type](action);
                // delete observer[action.type];
            }
        }
        return {
            subscribe,
            publish
        }
    }
    let channel = createChannel();
    function sagaMiddleware({ dispatch, getState }) {

        function run(generator, callback) {
            //开始自动执行generator
            console.log(generator, callback, '开始自动执行generator')
           
            let it = typeof generator[Symbol.iterator] == 'function' ? generator : generator();
            // let it = generator();
            function next(action) {
                //value :{type:'TAKE', actionType:ASYNC_INCREMENT}
                console.log('action---', action);
                //action ---  {type: "ASYNC_INCREMENT"}
                let { value: effect, done } = it.next(action);
                console.log('effect---',done, effect)
                //it.next(action); 会改变上一次yiled的返回值 上一次yieled的返回值就是action
                //代码一运行的时候已经执行过一次了 用户点击按钮派发action的时候 开始派发动作走了pulish 然后又走了一遍呢next 这时候把返回值改掉了
                //effect ----  {action: {type: "INCREMENT"}, type: "PUT"}
                if (!done) {
                     //yiled的值可能就是一个迭代器
                    if (typeof effect[Symbol.iterator] == 'function') {
                        run(effect);//如果是一个迭代器的话 直接传入run方法 执行
                        next();
                    } else if (typeof effect.then == 'function') {
                        //直接yeild delay(1000) 一个promise
                        effect.then(next);
                    } else {
                        switch (effect.type) {
                            case 'TAKE'://take就是要监听每个动作,当动作发生执行下一步
                                channel.subscribe(effect.actionType, next);
                                break;
                            case 'PUT'://{type:'PUT',action:increment}
                                console.log(dispatch, effect.action);
                                dispatch(effect.action);
                                next();//然后又要去订阅
                                break;
                            case 'FORK':
                                let newTask = effect.task(); //task是一个generator
                                run(newTask); //如果是fork 就开启一个新的子进程去执行
                                next(newTask);//自己的saga会立刻继续执行 不会在此等待 会改变上一个yield的返回值
                                //task = yield fork(increment); 会赋值给task
                                break;
                            case 'CANCEL':
                                effect.task.return('任务直接结束');
                                break;

                            case 'CALL':
                                //先让函数执行
                                effect.fn(...effect.args)
                                    .then(next);
                                //let result = yield call(delay, 1000);
                                //会把resolve的值reslove(ms) 传给next 方法
                                break;
                            case 'CPS':
                                effect.fn(...effect.args, next);//把nextang
                                break;
                            case 'ALL':
                                function times(cb, length) {
                                    let count = 0;
                                    return function () {
                                        if (++count === length) {
                                            cb();
                                        }
                                    }
                                }
                                let fns = effect.fns;
                                let done = times(next, fns.length);
                                effect.fns.forEach(fn => run(fn, done));
                                break;
                            default:
                                break;
                        }
                    }

                } else {
                    //saga完成 -- 执行next  
                    callback && callback()
                }
            }
            next();
        }
        sagaMiddleware.run = run;
        return next => action => {
            channel.publish(action);//派发动作
            next(action)
        }
    }
    return sagaMiddleware;
}