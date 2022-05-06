import { ErrorBoundary } from "components/ErrorBoundary";
import { FullPageErrorFallback } from "components/lib";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { useAuth } from "./context/AuthContext";
import { UnAuthenticatedApp } from "./UnAuthenticatedApp";

function App() {
  const { user } = useAuth();
  return (
    <div className="App" style={{ height: " 100vh" }}>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
