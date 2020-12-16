import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Icon, message} from "antd";
import Dragger,{DragProps,UploadFile} from './Dragger'
// const {Dragger} = Upload;
// interface Props {
//    name: string;
//    action: string;
//    onChange: any
// }
const props:DragProps= {
   name:'file',
   // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
   action:'http://localhost:8081/upload',
   onChange:(uploadFile:UploadFile) => {
       console.log(uploadFile);//上传状态发生改变时会执行回调
       const {status} = uploadFile;
   
       if (status === 'done') {
         message.success(`${uploadFile.file!.name}上传成功`);
       }else if (status === 'error'){
          console.error('错误');
         message.error(`${uploadFile.file!.name}上传失败`);
       }
    }
}
ReactDOM.render(<Dragger {...props}><Icon type="inbox" /></Dragger>, document.getElementById('root'))