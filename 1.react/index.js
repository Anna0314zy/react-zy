// batchingStrategy.isBatchingUpdates batchedUpdates
// 一个所谓的事务就是将需要执行的method使用wrapper 封装起来 再通过perform 方法执行
//先执行initialize => methods => close
class Transaction {
    constructor(wrappers) {
        this.wrappers = wrappers;
    }
    perform(anyMethod) {
        this.wrappers.forEach(wrapper => wrapper.initialize());
        anyMethod.call();//在这个方法执行前后做一些事情
        this.wrappers.forEach(wrapper => wrapper.close());
    }
}
let batchingStrategy = {
    isBatchingUpdates: false,//默认非批量更新模式
    dirtyComponents: [], //脏组件 --- 组件的状态和界面显示的不一样
    batchedUpdates() {
        this.dirtyComponents.forEach(component => {
            component.updateComponent()
        })
    }

}
//更新器
class updater {
    constructor(component) {
        this.component = component;//组件
        this.pendingStates = []; //暂存临时状态 缓存起来
    }
    addState(partcialState) {
        this.pendingStates.push(partcialState);
        //dirtyComponents 脏组件 --- 组件的状态和界面显示的不一样
        batchingStrategy.isBatchingUpdates ? 
        batchingStrategy.dirtyComponents.push(this.component):
        this.component.updateComponent();
    }
}

//父类 可以复用的逻辑
class Component{
    constructor(props){
        this.props = props;
        this.$updater = new updater(this);
    }
    updateComponent() {
        //把新状态与旧状态合并 -> 然后更新
        this.$updater.pendingStates.forEach(partcialState => {
            Object.assign(this.state, partcialState)
        })
        //替换节点
        this.$updater.pendingStates = [];
        let oldElement = this.domElement;
        let newElement = this.createDOMfromDOMString();
        oldElement.parentElement.replaceChild(newElement,oldElement);
    }
    // 把一个Dom模板字符创转换成真实dom
    fcreateDOMfromDOMString() {
        let htmlString = this.render();//父类调用子类的方法 创建的是子类的实例new Counter()
        // this.domElement = this.createDomFromDomString(htmlString);
        let div = document.createElement('div');
        div.innerHTML = htmlString;
        this.domElement = div.children[0]; // button的实例
        this.domElement.component = this;// this  当前counter组件实例
        // this.domElement.addEventListener('click', this.add.bind(this))
        return this.domElement;
    }
    // 用法 ：1.let countApp = document.getElementById('counter-app');
   // 2.new Counter({name:'珠峰架构'}).mount(countApp);
    mount(containter) {
        containter.appendChild(this.createDOMfromDOMString());
    }
    // 替换节点
    setState(partcialState) {
        //先缓存起来
        this.$updater.addState(partcialState);
        // this.state = Object.assign(this.state, partcialState);
        // let oldElement = this.domElement;
        // let newElement = this.createDOMfromDOMString();
        // oldElement.parentElement.replaceChild(newElement,oldElement);
    }
}
let transaction = new Transaction([{
    initialize() {
        console.log('initialize')
        batchingStrategy.isBatchingUpdates = true;// 开启批量更新模式
    },
    close() {
        console.log('close')
        batchingStrategy.isBatchingUpdates = false;// 开启批量更新模式
        batchingStrategy.batchedUpdates();//进行批量更新 把所有的脏组件
    }
}])
//事件委托 react也是通过事件委托方法实现
window.trigger = function(event, method, ...others) {
    console.log(event, method);
    let component = event.target.component;//拿到counter组件实例
    // component[method].call(event.target.component, event, method, ...others);
    transaction.perform(component[method].bind(component));
}
//只负责模板显示
class Counter extends Component{
    constructor(props) {
        super(props)
        this.state = {number:0};
    }
    //批量更新
    add() {
        this.setState({number: this.state.number+1})
        console.log(this.state);//0  延迟  合并 更新是异步的 
        this.setState({number: this.state.number+1})
        console.log(this.state);//0
        //此时批量更新 isBatchingUpdates false 直接更新
        setTimeout(() => {
        this.setState({number: this.state.number+1})
        console.log(this.state);//2
        this.setState({number: this.state.number+1})
        console.log(this.state);//3
        })
        // this.state({number: this.state.number+1})
    }
    //只管渲染 让代码更纯粹
    render() {
        return `<button id="counter-app" onClick="trigger(event, 'add')">${this.props.name}${this.state.number}</button>`
    }
    // render() {
    //     this.domElement = this.createDomFromDomString(`<button id="counter-app">${this.state.name}${this.state.number}</button>`)
    //         this.domElement.addEventListener('click', this.add.bind(this))
    //         return this.domElement;
    // }
}