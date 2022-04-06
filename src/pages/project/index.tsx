import { EpicPage } from "pages/Epic";
import { KanbanPage } from "pages/Kanban";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";

export const ProjectPage = () => {
  return (
    <div>
      <h1>ProjectPage</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanPage />} />
        <Route path={"/epic"} element={<EpicPage />} />
        <Route
          path="/"
          element={
            <Navigate to={window.location.pathname + "/kanban"} replace />
          }
        />
      </Routes>
    </div>
  );
};
