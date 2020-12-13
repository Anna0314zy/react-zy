import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import {Upload, Icon, message} from "antd";
import Dragger from './Dragger'
// const {Dragger} = Upload;
interface Props {
   name: string;
   action: string;
   onChange: any
}
const props:Props= {
   name:'file',
   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
   onChange:(info:any) => {
       console.log(info);//上传状态发生改变时会执行回调
       const {status} = info.file;
   
       if (status === 'done') {
         message.success(`${info.file.name}上传成功`);
       }else if (status === 'error'){
          console.error('错误');
         message.error(`${info.file.name}上传失败`);
       }
    }
}
ReactDOM.render(<Dragger {...props}><Icon type="inbox" /></Dragger>, document.getElementById('root'))