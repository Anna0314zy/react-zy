
// export default connect(
//     mapStateToProps,
//     actions
//     // mapDispatchToProps
// )(Counter)
// 执行两次返回的是一个组价
//用于连接仓库跟组件 目的是把状态映射为state
import React,{Component} from 'react';
import {bindActionCreators} from '../redux'
import ReduxContext from './context'
//mapStateToProps  把状态树映射为props
export default function(mapStateToProps, mapDispatchToProps) {
    return function(WrapperComponent) {
        return class extends Component{
            static contextType = ReduxContext;
            constructor(props, context) { //context = {store: this.props.store}
            console.log(props, context);
                super(props);
                this.state = mapStateToProps(context.store.getState());
            }
            componentDidMount() {
                this.unsubscribe = this.context.store.subscribe(() => {
                    this.setState(mapStateToProps(this.context.store.getState()));
                })
            }
            componentWillUnmount() {
                this.unsubscribe();
            }
            render() {
                let actions = {};
                if (typeof mapDispatchToProps == 'function') {
                    actions = mapDispatchToProps(this.context.store.dispatch);

                }else {
                    actions = bindActionCreators(mapDispatchToProps, this.context.store.dispatch);

                }
                return <WrapperComponent {...this.state} {...actions}></WrapperComponent>
            }
            
        }
    }
}
// import React,{Component} from 'react';
// import ReduxContext from './context';
// export default function(mapStateToProps,mapDispatchToProps){
//    return function(WrappedComponent){
//      return class extends Component{
//           static contextType = ReduxContext
//           constructor(props,context){
//               super(props);//context={store:this.props.store}
//               console.log(props, context);
//               this.state = mapStateToProps(context.store.getState());
//           }
//           componentDidMount(){
//               this.unsubcribe = this.context.store.subscribe(()=>{
//                   this.setState(mapStateToProps(this.context.store.getState()));
//               });
//           }
//           componentWillUnmount(){
//             this.unsubcribe();
//           }
//           render(){
//               return <WrappedComponent{...this.state}/>
//           }
//      }
//    }
// }