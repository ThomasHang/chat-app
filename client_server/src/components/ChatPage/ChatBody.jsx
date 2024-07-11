import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Image, Modal } from "@douyinfe/semi-ui";
import { getBase64 } from "@/utils/constant";
import FileModal from "./fileModal";

const ChatBody = ({ messages, lastMessageRef, typingStatus, historyMsg }) => {
  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      getBase64(files[i]).then((result) => {
        files[i].url = result;
      });
    }
    setFileList(files);
    showDialog();
  };

  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
    console.log("Ok button clicked");
  };
  const handleCancel = () => {
    setVisible(false);
    console.log("Cancel button clicked");
  };
  const handleAfterClose = () => {
    console.log("After Close callback executed");
  };

  const onCreate = () => {};

  return (
    <>
      <header className="chat__mainHeader">
        <p>与朋友聚会</p>
        <Button onClick={handleLeaveChat}>离开聊天</Button>
      </header>

      <div
        className="message__container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">你</p>
              <div className="message__sender">
                <p>{message.text}</p>
                {message.file && <Image src={message.file} />}
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              {message.file && <Image src={message.file} />}

              <div className="message__recipient">
                <p>{message.text}</p>
                <p>{message.img}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
        <Modal
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          closeOnEsc={true}
          centered={true}
        >
          <FileModal fileList={fileList} onCreate={onCreate} />
        </Modal>
      </div>
    </>
  );
};

export default ChatBody;
