import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { List, Project } from "./List";
import { SearchPanel } from "./SearchPanel";
import { useHttp } from "../../utils/http";
import styled from "styled-components";
import { Typography } from "antd";
import { useAsync } from "utils/useAsync";

const Container = styled.div`
  padding: 3.2rem;
`;

export const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const { run, error, isLoading, data: list } = useAsync<Project[]>();
  const client = useHttp();

  const debouncedParam = useDebounce(param, 200);
  useEffect(() => {
    run(client("projects?", { data: cleanObject(debouncedParam) }));
  }, [debouncedParam]);
  useMount(() => {
    client("users?").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List users={users} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};
