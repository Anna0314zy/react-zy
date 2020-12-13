import React from "react";
import "./index.less";
import { TreeData } from "../typings";
import TreeNode from "./tree-node";
interface Props {
  //接口类型 可以装饰约束 组件的属性对象
  data: TreeData;
}
interface State {
  //组件的状态 限制this.state
  data: TreeData;
}
interface KeynodeMap {
  //属性名任性 值是一个TreeData类型
  [key: string]: TreeData;
}
class Tree extends React.Component<Props, State> {
  keyNodeMap: KeynodeMap = {};
  constructor(props: Props) {
    super(props);
    this.state = { data: this.props.data }; //把属性传递给状态
  }
  componentDidMount() {
    this.buildKeyMap(); //创建一个keymap 属性名是key
  }
  buildKeyMap = () => {
    let data = this.state.data;
    this.keyNodeMap[data.key] = data;
    if (data.children && data.children.length > 0) {
      this.walk(data.children, data);
    }
  };
  walk = (children: TreeData[], parent: TreeData): void => {
    children.forEach((item: TreeData) => {
      item.parent = parent; //指向自己的父亲
      this.keyNodeMap[item.key] = item;
      if (item.children && item.children.length > 0) {
        this.walk(item.children, item);
      }
    });
  };
  //把key 节点的collapse 取反
  onCollapse = (key: string) => {
    console.log(this.keyNodeMap, "keyNodeMap");
    let data = this.keyNodeMap[key];
    if (data) {
      let {children} = data;
      if (children) {
        data.colladpsed = !data.colladpsed;
        data.children = data.children; //后面会改成懒加载
        this.setState({ data: this.state.data });
      }else { //没有children说明儿子需要加载
        data.loading = true;
        this.setState({ data: this.state.data });
      
        setTimeout(() => {
          data.children = [
            {
              name: `${data.name}-儿子1`,
              key: `${data.key}-1`,
              colladpsed: true,
            },
            {
              name: `${data.name}-儿子2`,
              key: `${data.key}-2`,
              colladpsed: true,
            }
          ];
          data.loading = false;
          data.colladpsed = false;
          this.buildKeyMap();//重新编译下
          this.setState({ data: this.state.data });
        }, 2000)
      }
     
    }
    
  };
  onCheck = (key: string) => {
    let data = this.keyNodeMap[key];
    if (data) {
      data.checked = !data.checked;
      data.children = data.children || []; //后面会改成懒加载
      if (data.checked) {
        //如果新的状态为true 了 所有的儿子都要为true
        this.checkAllChildren(data.children, true); //父亲选中 所有儿子要选中
        this.checkParent(data.parent); //如果一个节点，他所有的子节点都被选中，自己也要被选中
      }else {
        this.checkAllChildren(data.children, false); //所有节点都要取消选中
        this.checkParent(data.parent);
      }
    }
    this.setState({ data: this.state.data });
    console.log(this.state.data);
  };
//   var checkbox = document.getElementById("some-checkbox");
// checkbox.indeterminate = true;
  //父亲选中 所有儿子要选中
  checkAllChildren = (children: TreeData[] = [], checked: boolean) => {
    children.forEach((item: TreeData) => {
      item.checked = checked;
      this.checkAllChildren(item.children, checked);
    });
  };
  checkParent = (parent: TreeData | undefined) => {
    while (parent) {
      parent.children = parent.children || [];
      //如果自己的所有自己点都未被选择 则取消全选 如果有一个选择 则要半选
      parent.checked = parent.children.every((item: TreeData) => item.checked);
      parent.indeterminate = parent.children.some((item: TreeData) => item.checked);
      parent = parent.parent;
    }
   
  };
  render() {
    return (
      <div className="tree">
        <div className="tree-nodes">
          <TreeNode
            data={this.props.data}
            onCollapse={this.onCollapse}
            onCheck={this.onCheck}
          ></TreeNode>
        </div>
      </div>
    );
  }
}
export default Tree;
