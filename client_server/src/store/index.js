/*
 * @Author: 储天航 1193983801@qq.com
 * @Date: 2023-03-06 15:55:40
 * @LastEditors: 储天航 1193983801@qq.com
 * @LastEditTime: 2023-03-07 13:48:49
 * @FilePath: \chat-app\client_server\src\app\store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../store/features/counterSlice";
import chatReducer from "../store/features/chatSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    chat: chatReducer,
  },
});
