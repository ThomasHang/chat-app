import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      {userName}
      <button onClick={handleLeaveChat}>退出</button>
    </div>
  );
}
