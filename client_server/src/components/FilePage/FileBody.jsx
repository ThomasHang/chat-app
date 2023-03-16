/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-12 13:58:39
 * @LastEditors: 储天航 1193983801@qq.com
 * @LastEditTime: 2023-03-13 16:13:23
 * @FilePath: \chat-app\client_server\src\components\FilePage\FileBody.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useRef, useState } from "react";
import { Upload, Button } from "@douyinfe/semi-ui";
import { IconPlus, IconDelete, IconUpload } from "@douyinfe/semi-icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const FileBody = ({ socket }) => {
    console.log("socket", socket);
  const uploadRef = useRef();
  const [fileList, setFileList] = useState([]);

  const manulUpload = () => {
    console.log("manulUpload");
    // e.preventDefault();
    socket.emit("base64file", fileList);
    socket.emit("message", fileList);
  };

  // render() {
  let action = "https://api.semi.design/upload";

  const onChange = async ({ fileList, currentFile, event }) => {
    console.log("onChange");
    console.log(currentFile);
    const promises = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i].fileInstance;
      const list = await getBase64(file);
      promises.push(list);
    }

    Promise.all(promises)
      .then((results) => {
        console.log(results);
        setFileList(results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderFileOperation = (fileItem) => (
    <div style={{ display: "flex", columnGap: 8, padding: "0 8px" }}>
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
