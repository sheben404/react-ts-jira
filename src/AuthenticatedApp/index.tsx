import { Button } from "antd";
import { useAuth } from "../context/AuthContext";
import { ProjectListPage } from "../pages/ProjectList";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <Button onClick={logout}> 登出</Button>
      <ProjectListPage />
    </div>
  );
};
