import React, { useState, useEffect } from "react";
import UesrList from "./UesrList";
import FileBody from "./FileBody";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function FilePage({ socket }) {
  return (
    <div style={{ display: "flex" }}>
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
