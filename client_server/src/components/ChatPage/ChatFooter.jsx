/*
 * @Author: 储天航 1193983801@qq.com
 * @Date: 2023-03-06 10:27:47
 * @LastEditors: ThomasHang 11939838031@qq.com
 * @LastEditTime: 2023-03-19 00:52:58
 * @FilePath: \chat-app\client_server\src\components\ChatPage\ChatFooter.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import { Button, Modal } from '@douyinfe/semi-ui';
import { getBase64 } from '../../utils/constant';

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleTyping = () =>
    socket.emit('typing', `${localStorage.getItem('userName')} 正在输入`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  const handlePaste = (event) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        const imageFile = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (evt) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'image', content: evt.target.result },
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
      cancelButtonProps: { theme: 'borderless' },
      okButtonProps: { theme: 'solid' },
      okText: '发送',
      onOk: () => {
        socket.emit('message', {
          file: imgUrl,
          name: localStorage.getItem('userName'),
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
        });
      },
    });
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
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
