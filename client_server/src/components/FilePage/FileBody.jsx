import React, { useState, useEffect, useRef } from "react";

// const promises = blobs.map(
//   (blob) =>
//     new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onload = function (event) {
//         resolve({
//           name: blob.name || "unknown",
//           data: event.target.result,
//         });
//       };
//       reader.readAsDataURL(blob);
//     })
// );

const readBlobFile = (list) => {
  return list.map(
    async (blob) =>
      await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (event) {
          resolve({
            name: blob.name || "unknown",
            data: event.target.result,
          });
        };
        reader.readAsDataURL(blob);
      })
  );
};

function createFileList(files) {
  // Create a new FileList object
  const fileArray = new File();
  for (let i = 0; i < files.length; i++) {
    fileArray.push(files[i], files[i].name);
  }
  //   还有问题
  return fileArray;
  // return new window.FileList(fileArray);
}

export default function FileBody({ socket }) {
  const [postFile, setPostFile] = useState(""); //目前只考虑单个文件上传
  const [fileList, setFileList] = useState([]);
  const [showBeforeUploadList, setShowBeforeUploadList] = useState(false); // 是否显示上传前的文件列表
  const [fileUploaded, setFileUploaded] = useState(false); // 是否上传成功
  const [beforeUploadFileList, setBeforeUploadFileList] = useState([]); // 上传前的文件列表

  const inputRef = useRef(null);

  useEffect(() => {
    socket.on("base64fileRes", (data) => {
      setFileList([...fileList, data]);
      // setMessages([...messages, data]);
      // setSingleMessage(data);
    });
  }, [socket, fileList]);

  const getPostInfo = (e) => {
    e.preventDefault();
    // console.log(e, "e");
    // socket.emit("base64file", postFile);
    // console.log(postFile, "postFile");
    // const base64 = getBase64(e[0]);
    // console.log(base64, "sdfdsf");
    // console.log( getBase64(e[0]), "e");
  };

  const getFile = (e) => {
    console.log(e);
    // console.log(e[0].name, "e[0].name");
    const files = Array.from(e);
    setBeforeUploadFileList(files);

    // files.forEach((file) => {
    //   const name = file.name;
    //   console.log(name);
    // });
    // console.log(files, "files");
    // console.log(readBlobFile(files), "readBlobFile(e)");
    let reader = new FileReader();
    reader.readAsDataURL(e[0]);
    reader.onload = (e) => {
      //   console.log(reader, "render");
      setPostFile(reader.result);
    };
    setShowBeforeUploadList(true);
    // Promise.all().then((results) => {
    //   console.log(results, "results");
    //   setBeforeUploadFileList(results);
    // });
  };

  //   console.log(postFile, "postFile");
  console.log(beforeUploadFileList, "beforeUploadFileList");

  const handleDelete = (key) => {
    //根据 lastModified 移除数据
    const fileOrignalList = inputRef.current.files; //原始数据
    const files = Array.from(fileOrignalList);
    const filterOrignalList = files.filter((item) => {
      return item.lastModified !== key;
    });

    //需要重新赋值 inputRef.current.files
    const newFiles = createFileList(filterOrignalList);
    console.log(newFiles, "newFiles");

    // inputRef.current.files = filterOrignalList;
    console.log(filterOrignalList, "filterOrignalList");
    setBeforeUploadFileList(filterOrignalList);
    // console.log(item, "item");
    // console.log(inputRef.current.files, "inputRef.current.files");
  };

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      {/* <header className="chat__mainHeader">
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          退出
        </button>
      </header> */}
      <div>
        <div className="control">
          <label htmlFor="cover" className="cover">
            选择文件
          </label>
          <input
            type="file"
            // id="cover"
            name="file"
            ref={inputRef}
            multiple
            onChange={(e) => getFile(e.target.files)}
          />
        </div>
        {/* <div></div> */}
        {/* <input type="submit" value="上传" /> */}
        <div>
          {beforeUploadFileList.length > 0 &&
            beforeUploadFileList.map((item) => {
              const { name, lastModified } = item;
              return (
                <div key={name}>
                  {name}
                  <span onClick={() => handleDelete(lastModified)}>删除</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
