import React, { Component } from 'react'

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
        return true;
    }
    if (typeof obj1 !=='object' || obj1 === null || typeof obj2 !=='object' || obj2 === null) {
        return false
    }
    let keys1 =Object.keys(obj1);
    let keys2 =Object.keys(obj2);
    if (keys1.length !==keys2.length) {
        return false
    }
    for(let key of keys1) {
        if (!obj2.hasOwnProperty(key) || obj1[key]!=obj2[key]) {
            return false
        }
    }
    return true;

}
//深比较  原版是浅比较哦
// function shallowEqual(obj1, obj2) {
//     if (obj1 === obj2) {
//         return true;
//     }
//     if (typeof obj1 !=='object' || obj1 === null || typeof obj2 !=='object' || obj2 === null) {
//         return false
//     }
//     let keys1 =Object.keys(obj1);
//     let keys2 =Object.keys(obj2);
//     if (keys1.length !==keys2.length) {
//         return false
//     }
//     for(let key of keys1) {
//         if (obj2.hasOwnProperty(key)) {
//             if (obj1[key] !== obj2[key]) {
//                 if (typeof obj1[key] == 'object' && typeof obj2[key] == 'object') {

//                     return shallowEqual(obj1[key], obj2(key))
//                 }
//             }
            
//         }else {
//             return false
//         }
//     }
//     return true;

// }
