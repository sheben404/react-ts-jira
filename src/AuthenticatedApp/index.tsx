import { useAuth } from "../context/AuthContext";
import { ProjectListPage } from "../pages/ProjectList";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}> 登出</button>
      <ProjectListPage />
    </div>
  );
};
