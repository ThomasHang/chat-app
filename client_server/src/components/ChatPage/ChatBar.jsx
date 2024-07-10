import React, { useState, useEffect } from "react";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      console.log(data, "data");
      setUsers(data);
    });
    console.log(socket, "socket");
  }, [socket]);

  return (
    <div className="chat__sidebar">
      <h2>自由聊天</h2>
      <div>
        <h4 className="chat__header">在线用户</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.username}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
