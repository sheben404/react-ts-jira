import { useState } from "react";
import { useDebounce } from "../../utils";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import styled from "styled-components";
import { Typography } from "antd";
import { useProjects } from "utils/projects";
import { useUsers } from "utils/users";

const Container = styled.div`
  padding: 3.2rem;
`;

export const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 500);
  const { loading, error, list } = useProjects(debouncedParam);
  const { users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List users={users || []} dataSource={list || []} loading={loading} />
    </Container>
  );
};
