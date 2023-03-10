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
    posts: "key++,name, text, socketID",
  });
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
      setMessages([...messages, data]);
      setSingleMessage(data);
    });
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ 每当消息文字变动，都会往下滚动
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
