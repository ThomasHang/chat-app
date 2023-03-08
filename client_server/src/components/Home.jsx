/*
 * @Author: 储天航 1193983801@qq.com
 * @Date: 2023-03-06 10:09:18
 * @LastEditors: 储天航 1193983801@qq.com
 * @LastEditTime: 2023-03-08 15:48:34
 * @FilePath: \chat-app\client_server\src\components\Home.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });

    navigate("/File");
  };
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">传输文件</h2>
      <label htmlFor="username">用户名</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta">登录</button>
      {/* 创建房间号 */}
      {/* 加入房间号 */}
    </form>
  );
};

export default Home;
