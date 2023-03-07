/*
 * @Author: 储天航 1193983801@qq.com
 * @Date: 2023-03-07 11:11:25
 * @LastEditors: 储天航 1193983801@qq.com
 * @LastEditTime: 2023-03-07 15:32:03
 * @FilePath: \chat-app\client_server\src\store\features\chatSlice.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log(action.payload);
      state.userList.push(action.payload);
    },
  },
});

export const { addUser } = chatSlice.actions;

export default chatSlice.reducer;
