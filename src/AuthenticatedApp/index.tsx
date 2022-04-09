import { Button, Dropdown, Menu } from "antd";
import { Row } from "components/lib";
import { ProjectPopover } from "components/ProjectPopover";
import { ProjectPage } from "pages/Project";
import { ProjectModal } from "pages/ProjectList/ProjectModal";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import { resetRoute } from "utils";
import { useAuth } from "../context/AuthContext";
import { ProjectListPage } from "../pages/ProjectList";

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  justify-content: space-between;
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;

const PageHeader = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <h2 onClick={resetRoute} style={{ cursor: "pointer" }}>
          Ponds
        </h2>
        <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <a onClick={logout}>登出</a>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link">Hi, {user?.name}</Button>
    </Dropdown>
  );
};

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListPage setProjectModalOpen={setProjectModalOpen} />
              }
            />
            <Route path={"/projects/:projectId/*"} element={<ProjectPage />} />
            <Route path="/" element={<Navigate to="/projects" replace />} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};
