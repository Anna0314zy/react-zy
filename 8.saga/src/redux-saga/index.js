
//返回一个中间件
export default function createSagaMiddleware() {

    function createChannel() { //管道逻辑
        let observer = {};
        function subscribe(actionType, callback) {
            console.log(observer, 'oberver');
            observer[actionType] = callback; //订阅
        }
        function publish(action) {
            if (observer[action.type]) {
                //先删再绑定
                let next = observer[action.type];//把下次订阅完成才结束
                delete observer[action.type];
                next(action);
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
                //value :{type:'TAKE', actionType:''}
                let { value: effect, done } = it.next(action);
                if (!done) {
                    if (typeof effect[Symbol.iterator] == 'function') {
                        run(effect);//如果是一个迭代器的话 直接传入run方法 执行
                        next();
                    } else if (typeof effect.then == 'function') {
                        effect.then(next);
                    } else {
                        switch (effect.type) {
                            case 'TAKE'://take就是要监听每个动作,当动作发生执行下一步
                                channel.subscribe(effect.actionType, next);
                                break;
                            case 'PUT'://{type:'PUT',action:increment}
                                console.log(dispatch, effect.action);
                                dispatch(effect.action);
                                next();//第二次绑定完之后结束
                                break;
                            case 'FORK':
                                let newTask = effect.task(); //task是一个generator
                                run(newTask); //如果是fork 就开启一个新的子进程去执行
                                next(newTask);//自己的saga会立刻继续执行 不会在此等待
                                break;
                            case 'CANCEL':
                                effect.task.return('任务直接结束');
                                break;

                            case 'CALL':
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