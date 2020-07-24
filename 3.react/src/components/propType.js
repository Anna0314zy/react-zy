import React, { Component } from 'react'
import PropTypes from 'prop-types';
// let props = {
//     name: '张三', //字符串必填
//     age: 19, //数字  必填 不能小于18岁
//     gender:'male', //只能是male female
//     isMarried: true, //是否已婚
//     hobby:['smoking', '’drinking'], //字符床数组
//     position:{x:100,y:100} // x y 两个属性的对象
//   }
export default class propType extends Component {
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
