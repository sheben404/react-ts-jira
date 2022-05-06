import { EpicPage } from "pages/Epic";
import { KanbanPage } from "pages/Kanban";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes, useLocation } from "react-router";
import styled from "styled-components";
import { Menu } from "antd";

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectPage = () => {
  const routeType = useRouteType();

  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
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
      </Main>
    </Container>
  );
};
