import React, { useState, useEffect } from "react";

/**
 *  用户信息
 * @returns
 */
export default function UesrList({ socket }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      setUsers(data);
    });
    console.log(socket, "socket");
  }, [socket, users]);

  return (
    <div style={{ width: "50%" }}>
      <h4 className="chat__header">在线用户</h4>
      <div className="chat__users">
        {users.map((user) => (
          <p key={user.socketID}>{user.userName}</p>
        ))}
      </div>
    </div>
  );
}
