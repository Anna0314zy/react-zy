class Component {
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
    }
}

function ReactElement(type, props) {
    const element = {type, props};
    console.log('ReactElement--', type, props);
    return element;
}
function createElement(type, config = {}, children) {
    console.log('',type, config , children, 'ReactElement-createElement')
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