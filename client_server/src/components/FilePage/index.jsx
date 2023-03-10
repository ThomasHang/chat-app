/*
 * @Author: 储天航 1193983801@qq.com
 * @Date: 2023-03-08 13:59:45
 * @LastEditors: 储天航 1193983801@qq.com
 * @LastEditTime: 2023-03-09 09:25:21
 * @FilePath: \chat-app\client_server\src\components\FilePage\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from "react";
import UesrList from "./UesrList";
import FileBody from "./FileBody";
import Header from "./Header";

function FilePage({ socket }) {
  return (
    <div style={{ display: "flex" }}>
      <Header socket={socket} />
      <UesrList socket={socket} />
      <FileBody socket={socket} />
      {/* <form onSubmit={getPostInfo}> */}
      {/* <div className="control">
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="control">
          <label>Content</label>
          <textarea
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div> */}
      {/* <div>
        <div className="control">
          <label htmlFor="cover" className="cover">
            选择文件
          </label>
          <input
            type="file"
            id="cover"
            name="file"
            onChange={(e) => getFile(e.target.files)}
          />
        </div>
      </div> */}

      {/* </form> */}

      {/* {fileList.map((file) => {
        return (
          <div>
            <img src={file} alt="" />
          </div>
        );
      })} */}
    </div>
  );
}

export default FilePage;
