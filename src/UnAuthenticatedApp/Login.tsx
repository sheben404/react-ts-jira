import { useAuth } from "../context/AuthContext";
import { Button, Form, Input } from "antd";
import { LongButton } from "../UnAuthenticatedApp";

const LoginPage = () => {
  const { login } = useAuth();
  const handleSubmit = (value: { username: string; password: string }) => {
    login(value);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="username" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="password" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
