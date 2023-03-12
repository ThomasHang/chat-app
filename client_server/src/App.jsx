/*
 * @Author: 储天航 1193983801@qq.com
 * @Date: 2023-03-04 14:21:28
 * @LastEditors: ThomasHang 11939838031@qq.com
 * @LastEditTime: 2023-03-11 23:08:30
 * @FilePath: \ws-app\src\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { SetStateAction, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import socketIO from 'socket.io-client';
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import FilePage from './components/FilePage';
import './App.css';

// const socket = socketIO.connect("http://192.168.1.83:4000");
const socket = socketIO.connect('http://localhost:4000');

function App() {
  const body = document.body;
  body.setAttribute('theme-mode', 'dark');
  return (
    <BrowserRouter>
      <div className='h-full'>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/chat" element={<ChatPage socket={socket} />} />
        <Route path="/file" element={<FilePage socket={socket} />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
