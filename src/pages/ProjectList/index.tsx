import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import styled from "styled-components";
import { Typography } from "antd";
import { useProjects } from "utils/projects";
import { useUsers } from "utils/users";
import { useProjectModal, useProjectSearchParam } from "./utils";
import { ButtonNoPadding, Row } from "components/lib";

const Container = styled.div`
  padding: 3.2rem;
`;

export const ProjectListPage = () => {
  useDocumentTitle("任务列表", false);

  const { open } = useProjectModal();
  const [param, setParam] = useProjectSearchParam();
  const { loading, error, list, retry } = useProjects(useDebounce(param, 500));
  const { users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        users={users || []}
        dataSource={list || []}
        loading={loading}
      />
    </Container>
  );
};

ProjectListPage.whyDidYouRender = false;
