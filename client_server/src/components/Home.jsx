import React,{useEffect} from "react";
import { Form, Button } from "@douyinfe/semi-ui";
import { IconUser, IconKey } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log(values);
    const { username } = values;
    localStorage.setItem("userName", username);
    socket.emit("newUser", { username, socketID: socket.id });
    // Toast.info('表单已提交');
    navigate("/chat");
  };
  const handelCreate = (values) => {
    console.log(values);
    // handleSubmit()
  };

  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      console.log(data, "用户数据");
      // setUsers(data);
    });
    console.log(socket, "socket");
  }, [socket]);

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
                field="username"
                style={{ width: "100%" }}
                placeholder="请输入用户名"
                noLabel={true}
                prefix={<IconUser />}
              />
              {/* <Form.Input
                field="password"
                label="Password"
                style={{ width: "100%" }}
                placeholder="输入房间号"
                noLabel={true}
                prefix={<IconKey />}
              /> */}
              {/* <Form.Checkbox field="agree" noLabel>
              I have read and agree to the terms of service
            </Form.Checkbox> */}
              <div class="flex justify-between items-center">
                {/* <Button
                  theme="light"
                  type="primary"
                  onClick={() => handelCreate(values)}
                >
                  创建
                </Button> */}
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
