import { Button, Dropdown, Menu } from "antd";
import { Row } from "components/lib";
import styled from "styled-components";
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

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  // 渲染阶段产生的异常
  const obj: any = undefined;
  return (
    <Container>
      <div>{obj.notExist}</div>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
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
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListPage />
      </Main>
    </Container>
  );
};
