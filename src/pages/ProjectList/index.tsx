import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import styled from "styled-components";
import { Button, Typography } from "antd";
import { useProjects } from "utils/projects";
import { useUsers } from "utils/users";
import { useProjectSearchParam } from "./utils";
import { Row } from "components/lib";

const Container = styled.div`
  padding: 3.2rem;
`;

export const ProjectListPage = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle("任务列表", false);

  const [param, setParam] = useProjectSearchParam();
  const { loading, error, list, retry } = useProjects(useDebounce(param, 500));
  const { users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        projectButton={props.projectButton}
        refresh={retry}
        users={users || []}
        dataSource={list || []}
        loading={loading}
      />
    </Container>
  );
};

ProjectListPage.whyDidYouRender = false;
