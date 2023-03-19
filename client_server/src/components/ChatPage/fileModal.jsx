/*
 * @Author: ThomasHang 11939838031@qq.com
 * @Date: 2023-03-19 22:11:18
 * @LastEditors: ThomasHang 11939838031@qq.com
 * @LastEditTime: 2023-03-20 00:02:09
 * @FilePath: /chat-app/client_server/src/components/ChatPage/fileModal.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { Modal, Form } from '@douyinfe/semi-ui';
import { getBase64, convertFileSizeToKB } from '../../utils/constant';

export default function FileModal(props) {
  const { fileList } = props;
  console.log(fileList);
  const getInitValues = (list) => {
    const newFileList = [];
    for (let item of list) {
      const uid = Math.random().toString(36).substring(2);
      const { name, size, url } = item;
      console.log(item);
      newFileList.push({
        uid,
        name,
        url,
        size: convertFileSizeToKB(size),
        file: item,
        preview: true,
      });
    }
    console.log(newFileList, 'base64');
    return { files: newFileList };
  };

  return (
    <Form initValues={getInitValues(fileList)}>
      <Form.Upload
        field="files"
        // label="证明文件（Upload）"
        action="hahahhahh"
        uploadTrigger="custom"
        listType="list"
      >
        {/* <Button icon={<IconUpload />} theme="light">
          点击上传
        </Button> */}
      </Form.Upload>
    </Form>
  );
}
