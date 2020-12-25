import React,{Component} from 'react';

export default function withStyles(OriginalComponent,styles){
    class ProxyComponent extends Component{
        componentWillMount(){
            if(this.props.staticContext){ //只有服务端才有这个玩意
              // _getCss方法可以得到处理后的 css 源代码
              this.props.staticContext.csses.push(styles._getCss()); //靠的是loader
            }
        }
        render(){
            return <OriginalComponent {...this.props}/>
        }
    }
    ProxyComponent.loadData = OriginalComponent.loadData;
    return ProxyComponent;
}