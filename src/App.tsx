import { AuthenticatedApp } from "./AuthenticatedApp";
import { useAuth } from "./context/AuthContext";
import { UnAuthenticatedApp } from "./UnAuthenticatedApp";

function App() {
  const { user } = useAuth();
  return <div>{user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}</div>;
}

export default App;
