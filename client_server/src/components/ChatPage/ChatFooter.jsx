import React, { useState } from "react";
import { Button, Modal } from "@douyinfe/semi-ui";
import { getBase64 } from "../../utils/constant";
import { handlePaste } from "@douyinfe/semi-icons";
const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleTyping = () =>
    socket.emit("typing", `${localStorage.getItem("userName")} 正在输入`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };

  const handlePaste = (event) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf("image") !== -1) {
        const imageFile = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (evt) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: "image", content: evt.target.result },
          ]);
        };
        reader.readAsDataURL(imageFile);
        custom(imageFile);
      }
    }
  };

  const custom = async (value) => {
    const imgUrl = await getBase64(value);
    Modal.info({
      // title: "This is a custom modal",
      content: <img src={imgUrl} />,
      icon: false,
      cancelButtonProps: { theme: "borderless" },
      okButtonProps: { theme: "solid" },
      okText: "发送",
      onOk: () => {
        socket.emit("message", {
          file: imgUrl,
          name: localStorage.getItem("userName"),
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
        });
      },
    });
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <IconPaperclip />
        <input
          type="text"
          placeholder="编写消息"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          onPaste={handlePaste}
        />
        <Button type="primary" htmlType="submit">
          发送
        </Button>
      </form>
    </div>
  );
};

export default ChatFooter;
