import { type } from 'os';
import { Progress, Icon,Card} from 'antd';
import React,{useRef,MutableRefObject, RefObject,useEffect, useState} from 'react';
import './index.css'
//多个children属性
export type DragProps = React.PropsWithChildren<{
    onChange:any;
    name: string;
    action: string;
}>
export interface UploadFile {
    file: File; //上传的文件
    percent:number;
    url?:string;
    status: string;
}
const Dragger:React.FunctionComponent<DragProps> = function (props:DragProps):JSX.Element {
   let [uploadFiles, setUploadFiles] = useState<Array<UploadFile>>([]);
    //{current:指向真正的元素} 第一次渲染current:undefined 第二次开始current开始句指向真实的dom元素 从第二次开始指向就不再改变了
  let uploadContainer: MutableRefObject<HTMLDivElement | undefined> = useRef<HTMLDivElement | undefined>();
  //DragEvent 原生的
  const onDragEnter:(ev:DragEvent) => any = (ev:DragEvent):any => {
      ev.preventDefault();
      ev.stopPropagation();
  }
  const onDragOver:(ev:DragEvent) => any = (ev:DragEvent):any => {
    ev.preventDefault();
    ev.stopPropagation();
}
const onDragLeave:(ev:DragEvent) => any = (ev:DragEvent):any => {
    ev.preventDefault();
    ev.stopPropagation();
}
// (ev:DragEvent) => any 函数声明
const onDragDrop:(ev:DragEvent) => any = (ev:DragEvent):any => {
    ev.preventDefault();
    ev.stopPropagation();
    let transfer:DataTransfer | null = ev.dataTransfer;
    if (transfer && transfer.files) {
        upload (transfer.files)
    }
}
//上传
function upload(files: FileList) {
    console.log(files, 'files');
    for (let i = 0; i<files.length;i++) {
        let file = files[i];
        let formData = new FormData();
        formData.append('filename', file.name);
        formData.append(props.name, file);
        let xhr:XMLHttpRequest  = new XMLHttpRequest();
        xhr.open('POST',props.action, true);
        xhr.responseType = "json";
        xhr.onprogress = onUploadProgress;
        xhr.upload.onprogress = onUploadProgress;
        function onUploadProgress(event:ProgressEvent) {
            uploadFile.status = 'loading';
            if (event.lengthComputable) {
                let percent = parseInt((event.loaded / event.total * 100).toFixed(0));
                //当上传的过程中 会不停的触发onprogress 事件
                uploadFile.percent = percent;
                if (percent >=100) {
                    uploadFile.status = 'done';
                }
                setUploadFiles([...uploadFiles]);//必须弄一个新数组
            }
        }
        xhr.onerror = function() {
            uploadFile.status = 'error';
            setUploadFiles([...uploadFiles]);//必须弄一个新数组
        }
        xhr.timeout = 10000;
        xhr.ontimeout = function() {
            uploadFile.status = 'error';
            setUploadFiles([...uploadFiles]);//必须弄一个新数组
        }
        let uploadFile: UploadFile = {file, percent:0, status: 'uploading'}; 
        uploadFiles.push(uploadFile);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                uploadFile.url = xhr.response.url;
                props.onChange(uploadFile);
                setUploadFiles([...uploadFiles]);//必须弄一个新数组
            }
        }
        xhr.send(formData);


    }
}
//useEffect 中的函数会在组件挂载完成 真实Dom挂载完成后执行 或者更新后执行
useEffect(() => {
    uploadContainer.current!.addEventListener('dragenter',onDragEnter);
    uploadContainer.current!.addEventListener('dragover',onDragOver);
    uploadContainer.current!.addEventListener('dragleave',onDragLeave);
    uploadContainer.current!.addEventListener('drop',onDragDrop);
    //useEffect 会返回一个函数 会在组件卸载的时候执行
    
    return () => {
        uploadContainer.current!.removeEventListener('dragenter',onDragEnter);
        uploadContainer.current!.removeEventListener('dragover',onDragOver);
        uploadContainer.current!.removeEventListener('dragleave',onDragLeave);
        uploadContainer.current!.removeEventListener('drop',onDragDrop);
    }

})

    return (
        <>
       <div className="dragger-container" ref={uploadContainer as RefObject<HTMLDivElement>| undefined}>
           {props.children}
           </div>
           {
               uploadFiles.map((uploadFile:UploadFile, index:number) => (
                   <div key={index}>
                       <div>
                           {uploadFile.status === 'loading' ? <Icon type="loading" />  : <Icon type="paper-clip" />}
                          
                           <span style={{marginLeft:10}}> {uploadFile.file.name}</span>
                          <Progress percent={uploadFile.percent} status={uploadFile.status === 'error' ? 'exception' :undefined} />
                       </div>
                   </div>
               ))
           }
           {
               uploadFiles.map((uploadFiles:UploadFile, index:number) => (
                uploadFiles ? 
                <Card
                key={index}
                hoverable
                style={{ width: 100 }}
                cover={<img alt="example" src={uploadFiles.url} />}
              >
                <Card.Meta title={uploadFiles.file.name} />
              </Card> :null
               ))
           }
           </>
   )
}
export default Dragger;