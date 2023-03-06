/*
 * @Author: 储天航 1193983801@qq.com
 * @Date: 2023-03-04 15:28:19
 * @LastEditors: 储天航 1193983801@qq.com
 * @LastEditTime: 2023-03-06 15:59:44
 * @FilePath: \chat-app\client_server\src\main.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
