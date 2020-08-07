function render(element, parentNode) {
    console.log(element, parentNode)
    if (typeof element === 'string' || typeof element === 'number') {
        return parentNode.appendChild(document.createTextNode(element));
    }
    // let {
    //     type,
    //     props
    // } = element;
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