import { useState } from "react";
import LoginPage from "./Login";
import RegisterPage from "./Register";

export const UnAuthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <RegisterPage /> : <LoginPage />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
};
