/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-12 13:58:39
 * @LastEditors: ThomasHang 11939838031@qq.com
 * @LastEditTime: 2023-03-13 08:15:14
 * @FilePath: \chat-app\client_server\src\components\FilePage\FileBody.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useRef, useState } from 'react';
import { Upload, Button } from '@douyinfe/semi-ui';
import { IconPlus, IconDelete, IconUpload } from '@douyinfe/semi-icons';

// class ManulUploadDemo extends React.Component {
// constructor() {
//     super();
//     this.manulUpload = this.manulUpload.bind(this);
//     this.uploadRef = React.createRef();
// }
const FileBody = ({ socket }) => {
  const uploadRef = useRef();
  const [fileList, setFileList] = useState([]);

  const manulUpload = (e) => {
    e.preventDefault();
    console.log(fileList, 'fileList');
    socket.emit('upload', fileList[0].fileInstance, (status) => {
      console.log(status);
    });
    // this.uploadRef.current.upload();
  };

  // render() {
  let action = 'https://api.semi.design/upload';

  const onChange = ({ fileList, currentFile, event }) => {
    console.log('onChange');
    console.log(fileList);
    console.log(currentFile);

    for (let item of fileList) {
      
    }
    // setFileList(fileList);

    // let newFileList = [...fileList]; // spread to get new array
    // updateList(newFileList);
  };

  const renderFileOperation = (fileItem) => (
    <div style={{ display: 'flex', columnGap: 8, padding: '0 8px' }}>
      <Button
        onClick={(e) => fileItem.onRemove()}
        icon={<IconDelete />}
        type="tertiary"
        theme="borderless"
        size="small"
      />
    </div>
  );

  return (
    <div>
      <Upload
        // accept="image/gif, image/png, image/jpeg, image/bmp, image/webp"
        action={action}
        uploadTrigger="custom"
        ref={uploadRef}
        onChange={onChange}
        onSuccess={(...v) => console.log(...v)}
        onError={(...v) => console.log(...v)}
        multiple
        renderFileOperation={renderFileOperation}
      >
        <Button icon={<IconPlus />} theme="light" style={{ marginRight: 8 }}>
          选择文件
        </Button>
      </Upload>
      <Button icon={<IconUpload />} theme="light" onClick={manulUpload}>
        开始上传
      </Button>
    </div>
  );
  // }
};

export default FileBody;
