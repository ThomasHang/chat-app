// /*
//  * @Author: 储天航 1193983801@qq.com
//  * @Date: 2023-03-06 10:09:18
//  * @LastEditors: 储天航 1193983801@qq.com
//  * @LastEditTime: 2023-03-10 11:16:34
//  * @FilePath: \chat-app\client_server\src\components\Home.jsx
//  * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
//  */
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Home = ({ socket }) => {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     localStorage.setItem("userName", userName);
//     socket.emit("newUser", { userName, socketID: socket.id });

//     navigate("/chat");
//   };
//   return (
//     <form className="home__container" onSubmit={handleSubmit}>
//       {/* <h2 className="home__header">传输文件</h2> */}
//       <label htmlFor="username">用户名</label>
//       <input
//         type="text"
//         minLength={6}
//         name="username"
//         id="username"
//         className="username__input"
//         value={userName}
//         onChange={(e) => setUserName(e.target.value)}
//       />
//       <button className="home__cta">登录</button>
//       {/* 创建房间号 */}
//       {/* 加入房间号 */}
//     </form>
//   );
// };

import React from 'react';
import { Form, Toast, Button } from '@douyinfe/semi-ui';
import { IconUser, IconKey } from '@douyinfe/semi-icons';

const Home = ({ socket }) => {
  const handleSubmit = (values) => {
    console.log(values);
    // Toast.info('表单已提交');
  };
  const handelCreate = (values) => {
    console.log(values);
    // handleSubmit()
  };
  return (
    <div className="flex items-center justify-center h-full w-400">
      <div className="border border-slate-700 p-8 ">
        <Form
          onSubmit={(values) => handleSubmit(values)}
          style={{ width: 380 }}
        >
          {({ formState, values, formApi }) => (
            <>
              <div className="text-left text-2xl">登录</div>
              <Form.Input
                field="phone"
                label="PhoneNumber"
                style={{ width: '100%' }}
                placeholder="请输入用户名"
                noLabel={true}
                prefix={<IconUser />}
              />
              <Form.Input
                field="password"
                label="Password"
                style={{ width: '100%' }}
                placeholder="输入房间号"
                noLabel={true}
                prefix={<IconKey />}
              />
              {/* <Form.Checkbox field="agree" noLabel>
              I have read and agree to the terms of service
            </Form.Checkbox> */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Button
                  theme="light"
                  type="primary"
                  onClick={() => handelCreate(values)}
                >
                  创建
                </Button>
                <Button htmlType="submit" type="tertiary" theme="solid">
                  加入
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Home;
