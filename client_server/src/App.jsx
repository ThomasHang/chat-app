import { SetStateAction, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import socketIO from "socket.io-client";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
import FilePage from "./components/FilePage";
import FileUpload from "./pages/fileUpload";
import "./App.css";

function App() {
  const socket = socketIO.connect("http://localhost:4000");
  // const socket = socketIO.connect("http://192.168.1.83:4000");

  const body = document.body;
  body.setAttribute("theme-mode", "dark");
  return (
    <BrowserRouter>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/chat" element={<ChatPage socket={socket} />} />
          <Route path="/file" element={<FilePage socket={socket} />} />
          <Route path="/fileUpload" element={<FileUpload socket={socket} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
