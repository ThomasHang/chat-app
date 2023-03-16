/*
 * @Author: 储天航 1193983801@qq.com
 * @Date: 2023-03-06 10:26:55
 * @LastEditors: 储天航 1193983801@qq.com
 * @LastEditTime: 2023-03-16 11:21:33
 * @FilePath: \chat-app\client_server\src\components\ChatPage\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { useNavigate } from "react-router-dom";
import Dexie from "dexie";
// import { db } from "../../utils/db";
// console.log(db, "db");

const ChatPage = ({ socket }) => {
  const db = new Dexie("ReactDexie");

  db.version(1).stores({
    posts: "key++,name, text,socketID,file",
  });

  // db.version(2)
  //   .stores({
  //     posts: "key++,name,text,file,socketID",
  //   })
  //   .upgrade((transaction) => {
  //     // 从 myTable 存储区中读取所有记录
  //     transaction.posts.toCollection().modify((record) => {
  //       // 将 age 字段设置为默认值 0
  //       record.file = null;
  //     });
  //   });
  // .then(() => {
  //   console.log("存储区已成功升级！");
  // })
  // .catch((error) => {
  //   console.log(`存储区升级失败：${error}`);
  // });

  db.open().catch((err) => {
    console.log(err.stack || err);
  });
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);
  const [signleMessage, setSingleMessage] = useState({});
  const [histroyMsg, setHistroyMsg] = useState([]);
  useEffect(() => {
    socket.on("messageResponse", (data) => {
      console.log(data,"ata")
      setMessages([...messages, data]);
      setSingleMessage(data);
    });
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ 每当消息文字变动，都会往下滚动
    console.log(lastMessageRef, "lastMessageRef");
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    // db.posts.add(messages);
  }, [messages]);

  useEffect(() => {
    console.log(signleMessage, "signleMessage");
    if (signleMessage.text) {
      db.posts.add(signleMessage).then(async () => {
        //retrieve all posts inside the database
        let allPosts = await db.posts.toArray();
        //set the posts
        setHistroyMsg(allPosts);
      });
    }
  }, [signleMessage]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      navigate("/");
    }
  }, []);

  const getPosts = async () => {
    let allPosts = await db.posts.toArray();
    // setPosts(allPosts);
    setHistroyMsg(allPosts);
  };
  useEffect(() => {
    //get all posts from the database

    getPosts();
  }, []);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
          histroyMsg={histroyMsg}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
