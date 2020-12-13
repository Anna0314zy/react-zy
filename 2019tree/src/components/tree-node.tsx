import React from "react";
import { TreeData } from "../typings";
import caretRight from './img/caret-right.png'
import caretDown from './img/xiangxia.png'
import file from './img/file.png'
import closeFolder from './img/wenjianjia_1.png'
import openFolder from './img/wenjianjia.png'
import loadingSrc from './img/jiazaizhong.png'
interface Collapse {
  (key: string): void;
}
interface Props {
  //接口类型 可以装饰约束 组件的属性对象
  data: TreeData;
  key?: string;
  onCollapse:Collapse;
  onCheck:any;
  indeterminate?:boolean;
}
class TreeNode extends React.Component<Props> {
  inputRef:any;
  constructor(props: Props) {
    super(props);
  }

  render() {
    let {
      data: { name, children, key, colladpsed,checked=false,loading },
      onCheck
    } = this.props;
    let caret = null;//箭头
    let icon = null;//图标
    if (children) { //如果children有值的话
      if(children.length > 0) {
        caret = <span className={`colladpsed ${colladpsed ? 'caret-right': 'caret-down'}`}
        onClick={() => this.props.onCollapse(key)}></span>
        icon = colladpsed ? closeFolder: openFolder;
      }else {
        //children: []
        caret = null;
        icon = file;
      }
     

    }else {//没有 显示关闭的文件夹 向下的箭头 可能有懒加载
       caret = (
         loading ? <img className="colladpsed" src={loadingSrc} style={{width:14,top:'50%', marginTop: -7}} /> :<span className={`colladpsed caret-right`}
          onClick={()=>this.props.onCollapse(key)}></span>
       )
       icon = closeFolder;
    }
    return (
      <div className="tree-node">
        <div className="inner">
          {caret}
          <span className="content">
            <input
            type="checkbox" 
            checked={checked}
            onChange={() => onCheck(key)}/>
            <img src={icon} alt="" style={{width: 20 }}/>

            {name}
            </span>

        </div>
        {children && children.length > 0 && !colladpsed && (
          <div className="children">
            {
            children.map((item: TreeData) => (
              <TreeNode data={item} key={item.key} 
              onCheck={onCheck}
              onCollapse={this.props.onCollapse}
              ></TreeNode>
            ))
            }
          </div>
        )}
      </div>
    );
  }
}
export default TreeNode;
