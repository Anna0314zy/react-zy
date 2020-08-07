[TOC]

## react基础用法

### ref 的用法

```ba
1.ref的值是一个字符串
2.ref的值是一个函数
3.为DOM元素添加ref
4.为class组件添加ref
5.ref转发
```

```js
//常用

class Sum2 extends React.Component {
  constructor(props) {
    super(props);
    this.numA = React.createRef();//把真实dom给了current
    this.numB = React.createRef();
    this.result = React.createRef();
  }
  componentDidMount() {
   
  }
  add = () => {
    let numA = this.numA.current.value;
    let numB = this.numB.current.value;
    let result = parseFloat(numA) + parseFloat(numB);
    this.result.current.value = result;
  }
  render() {
    return (
    <> 
    <input ref={this.numA}></input>+
    <input ref={this.numB}></input><button onClick={this.add}>等于</button>
    <input ref={this.result}></input>
    </>
    )
  }
 
}
1.以下基本废弃
class Sum extends React.Component {
  componentDidMount() {
   
  }
  add = () => {
    let numA = this.refs.numA.value;
    let numB = this.refs.numB.value;
    let result = parseFloat(numA) + parseFloat(numB);
    this.refs.result.value = result;
  }
  render() {
    return (
    <> 
    <input ref="numA"></input>+
    <input ref="numB"></input><button onClick={this.add}>等于</button>
    <input ref="result"></input>
    </>
    )
  }
}
2.
class Sum1 extends React.Component {
  componentDidMount() {
   
  }
  add = () => {
    let numA = this.numA.value;
    let numB = this.numB.value;
    let result = parseFloat(numA) + parseFloat(numB);
    this.result.value = result;
  }
  render() {
    return (
    <> 
    <input ref={inst => this.numA = inst}></input>+
    <input ref={inst => this.numB = inst}></input><button onClick={this.add}>等于</button>
    <input ref={inst => this.result = inst}></input>
    </>
    )
  }
 
}
```

### forwardRef

```js
forwardRef 原理  中转站 转发ref
function forwardRef(funComponent) {
    return function(props) { // ref:{current:null}
        return funComponent(props, props.ref1)
    }
}
用法
function TextInput2(props, ref) {
    return <input ref={ref} />
  }
 TextInput2 = forwardRef(TextInput2)
class Form extends React.Component{
    //Form想操作TextInput2 里面的input 的dom
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    getFocus = () => {
        this.textInput.current.focus();
    }
    render() {
        return (
            <>
            <TextInput2 ref={this.textInput} />
            <button onClick={this.getFocus}>focus</button>
            </>
        )
    }
}

```

### setState

```js
class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {number: 0, name: 'zy'};
    }
    //state 异步更新
    add = () => {
    //   this.state.number = this.state.number + 1;
    //   this.setState({number:this.state.number+1});
    //   console.log(this.state.number); // 0  this.state.number读到的是0 
    //   this.setState({number:this.state.number+1});
    //   console.log(this.state.number);// 0
    //当调用setState的时候 其实状态并没有改变 而是放入一个队列中
      this.setState((state)=>({number:state.number+1}), () => {
          console.log(this.state); // 2
      });
      console.log(this.state.number);// 0
      this.setState((state)=>({number:state.number+1}))//state是最新的值
      console.log(this.state.number);// 0
    }
    render() {
        return (
            <>¡
            <p>{this.state.name}{this.state.number}</p>
            <button onClick={this.add}>+</button>
            </>
        )
    }
}
```

### 关于setState的一些思考

```js
如何实现组件的复用
//父类 可以复用的逻辑
class Component{
    constructor(props){
        this.props = props;
        this.$updater = new updater(this);//给每个组件都配一个更新器
    }
  //批量更新
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
子类
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
```

#### setState的内部实现

<img src="/Users/zouyu/Desktop/react-zy/img/setSTtae.png" style="zoom:50%;" />

```js
首先看是不是批量更新 
let batchingStrategy = {
    isBatchingUpdates: false,//默认非批量更新模式
    dirtyComponents: [], //脏组件 --- 组件的状态和界面显示的不一样
    batchedUpdates() {
        this.dirtyComponents.forEach(component => {
            console.log(component, 'dirtyComponents');
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
```

```js
找到是否批量更新的时机  开启批量更新 关闭批量更新
//事件委托 react也是通过事件委托方法实现
window.trigger = function(event, method, ...others) {
    console.log(event, method);
  //当事件执行的时候 就开启批量更新
    let component = event.target.component;//拿到counter组件实例
    // component[method].call(event.target.component, event, method, ...others);
    transaction.perform(component[method].bind(component));//返回add的方法
}
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
```

### react.js

```js
用法
let ele = React.createElement('h1', { className: "mytitle"
}, 'hello', React.createElement('span', null, 'world'));
/**
 * React就是一个普通的js对象
 *  {
  "type":"h1",
  "key":null,
  "ref":null,
  "props":{
      "className":"mytitle",
      "children":[
          "hello",
          {
              "type":"span",
              "key":null,
              "ref":null,
              "props":{
                  "children":"world"
              },
              "_owner":null,
              "_store":{

              }
          }
      ]
  },
  "_owner":null,
  "_store":{

  }
}
 */


```

<img src="/Users/zouyu/Desktop/react-zy/img/WX20200805-102157@2x.png" style="zoom:50%; text-align:left" />

<img src="/Users/zouyu/Desktop/react-zy/img/WX20200805-102711@2x.png" style="zoom:50%;" />

```js
react.js
class Component {
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
    }
}

function ReactElement(type, props) {
    const element = {type, props};
    console.log('element--', element);
    return element;
}
function createElement(type, config = {}, children) {
    let propName;
    const props = {};
    for (propName in config) {
        props[propName] = config[propName];
    }
    props.children = Array.from(arguments).slice(2);
    return ReactElement(type, props);
}
export default {
    createElement,
    Component
}
```

### reactDOM

```js
react-dom.js
function render(element, parentNode) {
    console.log(element, parentNode)
    if (typeof element === 'string' || typeof element === 'number') {
        return parentNode.appendChild(document.createTextNode(element));
    }
    let type, props;
    type = element.type;
    props = element.props;
    // class Welcome1 extends React.Component {
    //     render() {
    //       return React.createElement('h1', {}, props.name, props.age)
    //     }
    //   }
    //子类 Welcome1 继承了父类的isReactComponent
    if (type.isReactComponent) {
        //类组件
        let returnElement = new type(props).render();
        type = returnElement.type;//h1
        props = returnElement.props;
    } else if (typeof type === 'function') { //函数式组件
        /**
         * function Welcome(props) {
          return React.createElement('h1', {}, props.name, props.age)
            }
           let element = React.createElement(Welcome, {name:'zhufeng', age:10});
         */

        let returnElement = type(props);//把props传给函数
        console.log('returnElement--', returnElement);
        type = returnElement.type;//
        props = returnElement.props;

    }
    let domElement = document.createElement(type);
    for (let propName in props) {
        console.log(propName, 'propName');
        if (propName === 'className') {
            domElement.className = props[propName];
        } else if (propName === 'style') {
            let styleObj = props[propName];
            // for (let attr in styleObj) {
            //     domElement.style[attr] = styleObj[attr];
            // }
            let cssText = Object.keys(styleObj).map(attr => {
                //正则 有待研究一下下哦
                return `${attr.replace(/([A-Z])/g, function () { return '-' + arguments[1] })}: ${styleObj[attr]}`;
            });
            // domElement.style.cssText = 'color:red;font-size:50px';
            domElement.style.cssText = cssText;
        } else if (propName === 'children') {
            console.log(props.children, 'props.children');
            let children = Array.isArray(props.children) ? props.children : [props.children];
            children.forEach(child => render(child, domElement));
        } else {
            domElement.setAttribute(propName, props[propName])
        }
    }
    parentNode.appendChild(domElement);
}
export default {
    render
}
```

### 生命周期

#### 旧版生命周期

![](/Users/zouyu/Desktop/react-zy/img/WX20200806-215207@2x.png)

```js
//渲染过程中react 16 后可能会执行多次 不建议请求接口操作
    //react 16之后 有优化  
    //如果ssr 客户端一次 服务端一次 而 componentDidMount 只有一次
    //componentWillMount 新版取消
    componentWillMount() {
        console.log('2组件将要挂载')
    }
    //一般在这里做异步操作 请求接口 永远只有一次
    componentDidMount() {
        console.log('componentDidMount', '4组件挂载完成')
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps, nextState, 'nextProps, nextState');
        console.log('5shouldComponentUpdate询问是否需要更新')
        return true;
    }
    //新版取消
    componentWillUpdate() {
        console.log('6componentWillUpdate组件将要更新')
    }
    componentDidUpdate() {
        console.log('7componentDidUpdate组件更新完毕')
    }
//子组件
 //组件收到新的属性 新版取消
    componentWillReceiveProps() {
        console.log('子组件componentWillReceiveProps 将要接收新的属性')
    }
    componentWillUnmount() {
        console.log('子组件componentWillUnmount 将要卸载')
    }
```

#### 新版生命周期react16

![](/Users/zouyu/Desktop/react-zy/img/生命周期新.png)

```js
废弃 componentWillMount  componentWillReceiveProps componentWillUpdate
增加getDerivedStateFromProps  getSnapshotBeforeUpdate  
```

```js
子组件
//根据新的属性对象派生状态对象 新的属性对象 和旧的状态对象
    //把props 映射为state状态 prevState 上一个状态 
//getDerivedStateFromProps 静态方法
    static getDerivedStateFromProps(nextProps, prevState) {
        //会返回新的状态对象 替换掉旧的状态
        // return{date:Date.now()} // 可以通过this.state找到该属性
        if (nextProps.number%2===0) {
            return {number:prevState.number+nextProps.number*2}
        }else {
            return {number:prevState.number+nextProps.number*3}
        }
    }
// 它的含义是在React更新Dom元素之前，获取一个快照，它返回的结果将作为componentDidUpdate的第三个参数。一般的用法就是获取更新前的DOM
  getSnapshotBeforeUpdate() {
        //返回更新前的内容高度 
        return this.wrapper.current.scrollHeight; //给下面的prevScrollHeight
    }
 //组件更新完毕
    componentDidUpdate(prevProps, prevState, prevScrollHeight) {
        this.wrapper.current.scrollTop = 
        this.wrapper.current.scrollTop +(this.wrapper.current.scrollHeight -prevScrollHeight);
    }
```

### getDerivedStateFromProps

参考链接https://www.jianshu.com/p/cafe8162b4a8

判断的时候需要返回一个null以免阻断更新

```bash
触发机制:
1.UNSAFE_componentWillReceiveProps(nextProps) 在组件接收到新的参数时被触发.
当父组件导致子组件更新的时候, 即使接收的 props 并没有变化, 这个函数也会被调用
2.getDerivedStateFromProps 会在每次组件被重新渲染前被调用, 这意味着无论是父组件的更新, props 的变化, 或是组件内部执行了 setState(), 它都会被调用.
工作方式
UNSAFE_componentWillReceiveProps(nextProps):
1.参数是组件接收到的新的 props , 用于比对新的 props 和原有的 props, 用户需要在函数体中调用 setState() 来更新组件的数据.
2.static getDerivedStateFromProps(nextProps, currentState):
参数是组件接收到的新的 props 和组件当前的数据. 用户需要在这个函数中返回一个对象, 它将作为 setState() 中的 Updater 更新组件.

作者：Apolo_Du
链接：https://www.jianshu.com/p/cafe8162b4a8
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

```bash
为什么不应该使用 getDerivedStateFromProps
1.getDerivedStateFromProps 是一个静态方法, 是一个和组件自身"不相关"的角色. 在这个静态方法中, 除了两个默认的位置参数 nextProps 和 currentState 以外, 你无法访问任何组件上的数据.
2.会被频繁地触发
无论是组件调用了 setState(), 接收的 props 发生了变化, 或是父组件的更新都会导致子组件上的 getDerivedStateFromProps被触发.
相比起在 UNSAFE_componentWillReceiveProps(nextProps) 的函数体中直接比较 this.props 和 nextProps 上的字段. 你需要"绕一个弯" 去比较 nextProps 和 currentState.
3.使用的时候必须非常小心
由于 getDerivedStateFromProps 会在 setState() 后被调用, 并且它的返回值会被用于更新数据. 这意味着你会在 setState() 之后触发 getDerivedStateFromProps, 然后可能意外地再次 "setState()".

getDerivedStateFromProps(nextProps) 函数中的第一个位置参数未必是 "新" 的 props. 在组件内调用了 setState() 时, getDerivedStateFromProps 会被调用. 但是此时的组件其实并没有获得 "新" 的 props, 是的, 这个 nextProps 的值和原来的 props 是一样的.

这就导致了我们在使用 getDerivedStateFromProps 时, 必须添加很多逻辑判断语句来处理 props 上的更新和 state 上的更新, 避免意外地返回了一个 Updater 再次更新数据, 导致数据异常.
```

```js
更优雅的做法
React 官方博客中提供了以下几种方案:

1.让表单控件变成完全受控组件, 不论是 onChange 处理函数还是 value 都由父组件控制, 这样用户无需再考虑这个组件 props 的变化和 state 的更新.
function EmailInput(props) {
  return <input onChange={props.onChange} value={props.email} />;
}
2.让表单控件变成完全不受控组件, 但是具有 key 属性.
仍然用自身的数据来控制 value. 但是接收 props 中的某个字段作为 key 属性的值, 以此响应 props 的更新: 当 key 的值变化时 React 会替换 (reset)组件, 从而重新生成初始化数据.
```

### getSnapshotBeforeUpdate

参考：优秀https://segmentfault.com/a/1190000014456811?utm_source=channel-hottest

### [在更新之前读取DOM属性](https://reactjs.org/#reading-dom-properties-before-an-update)

下面是一个组件的例子，它在更新之前从DOM中读取属性，以便在列表中保持滚动位置：

```
class ScrollingList extends React.Component {
  listRef = null;
  previousScrollOffset = null;

  componentWillUpdate(nextProps, nextState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (this.props.list.length < nextProps.list.length) {
      this.previousScrollOffset =
        this.listRef.scrollHeight - this.listRef.scrollTop;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // If previousScrollOffset is set, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    if (this.previousScrollOffset !== null) {
      this.listRef.scrollTop =
        this.listRef.scrollHeight -
        this.previousScrollOffset;
      this.previousScrollOffset = null;
    }
  }

  render() {
    return (
      `<div>`
        {/* ...contents... */}
      `</div>`
    );
  }

  setListRef = ref => {
    this.listRef = ref;
  };
}
```

在上面的例子中，`componentWillUpdate`被用来读取DOM属性。但是，对于异步渲染，“render”阶段生命周期（如`componentWillUpdate`和`render`）与“commit”阶段生命周期（如`componentDidUpdate`）之间可能存在延迟。如果用户在这段时间内做了类似调整窗口大小的操作，则从`componentWillUpdate`中读取的`scrollHeight`值将失效。

解决此问题的方法是使用新的“commit”阶段生命周期`getSnapshotBeforeUpdate`。在数据发生变化之前立即调用该方法（例如，在更新DOM之前）。它可以将React的值作为参数传递给`componentDidUpdate`，在数据发生变化后立即调用它。

这两个生命周期可以像这样一起使用：

```js
class ScrollingList extends React.Component {
  listRef = null;

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      return (
        this.listRef.scrollHeight - this.listRef.scrollTop
      );
    }
    return null;
  }
 //
  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      this.listRef.scrollTop =
        this.listRef.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      `<div>`
        {/* ...contents... */}
      `</div>`
    );
  }

  setListRef = ref => {
    this.listRef = ref;
  };
}
```

### context

#### 旧版

```js
1.父组件
// //定义子上下文对象的属性和类型
    static childContextTypes = {
        name: PropTypes.string,
        age:PropTypes.number
        
    }
     //返回或者说定义真正的子上下文
     getChildContext() {
        return {
        age:10,
        name:'Header'
        }

    }
2.子组件
// 我要获取哪些上下文对象
    static contextTypes = {
        color: PropTypes.string,
        name:PropTypes.string,
        age:PropTypes.number
    }
直接this.context 能够获取上下文对象
```

#### prop-types检测props数据类型

https://www.npmjs.com/package/prop-types npm官网

https://reactjs.org/docs/typechecking-with-proptypes.html react官方

```js
//安装
npm install prop-types --save
//引入
import PropTypes from 'prop-types';
//Son是声明的组件
Son.defaultProps = {
  name: 'Stranger'
};
Son.propTypes = {
     optionalArray: PropTypes.array,//检测数组类型
     optionalBool: PropTypes.bool,//检测布尔类型
     optionalFunc: PropTypes.func,//检测函数（Function类型）
     optionalNumber: PropTypes.number,//检测数字
     optionalObject: PropTypes.object,//检测对象
     optionalString: PropTypes.string,//检测字符串
     optionalSymbol: PropTypes.symbol,//ES6新增的symbol类型
     PropTypes.any.isRequired

多类型
Auth.propTypes = {
       number:PropTypes.oneOfType(
           [PropTypes.string,PropTypes.number]
       )
}
多个值
Auth.propTypes = {
       number:PropTypes.oneOfType(
           [12,24,35]
       )
}
//检测prop为一个数组，元素为数值
Auth.propTypes = {
       array:PropTypes.arrayOf(PropTypes.number)
}
Auth.propTypes = {
    brandsList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        keywords: PropTypes.string.isRequired,
        excludeKeywords: PropTypes.string,
        sites: PropTypes.string.isRequired,
        status: PropTypes.string,
        
      }),
    ).isRequired,
    isBrandsListLoaded: PropTypes.bool.isRequired
}
//函数
在属性prop的类型检测中，属性值是一个函数，在这里props是包含prop的props对象，propName是prop的属性名，componentName是props所在的组件名称，函数的返回值是一个Error对象
Son.propTypes = {
      prop:function(props,propName,componentName){
          if(/*判断条件*/){
               return new Error(/*错误的参数*/)
           }
    }
}
```

#### 使用实例

```js
//使用例子
export default class  extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }
    static defaultProps = {
        isMarried: false
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        // age: PropTypes.number.isRequired,
        gender: PropTypes.oneOf(['male', 'female']),
        isMarried: PropTypes.bool, //是否已婚
        hobby: PropTypes.arrayOf(PropTypes.string), //字符床数组
        position: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number
        }),
        age(props, propName, componentName) {
            console.log(propName)
            if (!props[propName] || props[propName] < 18) {
                return new Error(`age > 18 invalid ${propName} supplied to ${componentName}`);
            }
        }
    }
    render() {
        return (
            <div>
                {this.props.name}
            </div>
        )
    }
}
```

#### 新版context

```js
1.创建上下文
ThemeContext = React.createContext()
2.ThemeContext.Provider 向下传递数据
render() {
        let ctx = {color:this.state.color, setColor:this.setColor}
        return (
            <ThemeContext.Provider value={ctx}>
                <div style={{ border: '2px solid red', padding: '5px' }}>
                    page
                <Header>
                        {/* <Title></Title> */}
                    </Header>
                    <Main>
                        {/* <Content></Content> */}
                    </Main>
                </div>
            </ThemeContext.Provider>

        );
    }
    3.类组件如何获取
    class Content extends Component {
    static contextType = ThemeContext;
    render() {
     // this.context = Title.contextType.Provider.value;//自己写的方法才需要加上这个
        console.log(this.context); //直接获取上下文对象
        return null；
}
4.函数式组件如何获取
function Title(props) {
    return (
        <ThemeContext.Consumer>
            {
                value => (
                    <div style={{ border: '2px solid orange', padding: '5px', color: value.color }}>
                    title
                    name={value.name}
                    age={value.age}
                </div>
        )
                
            }
        </ThemeContext.Consumer>
    )
       
}
```

```js
上下文模拟 忽略
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');

function createContext() {
    class Provider extends Component{
        static value;
        $$typeof=REACT_PROVIDER_TYPE;
        constructor(props) {
            super(props);
            Provider.value = props.value;
            this.state = {value:props.value}
        }
        //映射为新的状态对象
       static getDerivedStateFromProps(props, state) {
        Provider.value = props.value;
            return {value:props.props}
        }
        render() {
            return this.props.children;
        }
    }
    class Consumer extends Component{
        render() {
            return this.props.children(Provider.value);
        }
    }
    return {$$typeof:REACT_CONTEXT_TYPE,Provider,Consumer}
}
```

### pure

```js
import React, { PureComponent, Component } from 'react'
1.类组件
class Title extends PureComponent {
  this.state = {number:{counter:0}}
//错误写法❎
this.state.number.count = ...
//正确写法✅
this.setState({number:{counter:this.state.number}})
  //注意 setState的时候一定要构建一个新对象 否则组件是不会更新的  if (obj1 === obj2) {
        return true;//是不是一个内存地址
    }
    
    render() {
        console.log('Title -render'); //如果自身属性没有变化就不用刷新
        return <div>{this.props.title}</div>
    }
2.函数组件

   
```

```js
原理
export default class PureComponent extends Component {
    isPureComponent = true;
    //传入新的属性对象和状态对象 然后返回一个是否需要更新的boolean值
    shouldComponentUpdate(nextProps, nextState) {
        //相等就不用渲染
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
//源码就是浅比较
//浅比较  只比较一层 obj1 和 obj2是否相等 相等返回true否则false,只比较第一层
//不是一个引用地址  就不相等
function shallowEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;//是不是一个内存地址
    }
   //看是不是对象 或者 null 直接返回false不相等
    if (typeof obj1 !=='object' || obj1 === null || typeof obj2 !=='object' || obj2 === null) {
        return false
    }
    let keys1 =Object.keys(obj1);
    let keys2 =Object.keys(obj2);
  //如果长度不相等 肯定就不相等
    if (keys1.length !==keys2.length) {
        return false
    }
    for(let key of keys1) {
       //如果obj2没有obj1的属性  或者有 但是跟obj1 不相等 还是flase
        if (!obj2.hasOwnProperty(key) || obj1[key]!=obj2[key]) {
            return false
        }
    }
    return true;

}
```





### Redux-saga

#### 1.简介



### 目录
## 2.使用的软件
### typora
### markdown语法
##3.怎么创建大纲和目录

### 怎么创建大纲
### 怎么创建目录

## 问题

### 1.无限滚动的实现

### 2.table 实现大量数据的渲染

