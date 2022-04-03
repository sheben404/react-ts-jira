import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { useHttp } from "../../utils/http";
import styled from "styled-components";
import { Typography } from "antd";

const Container = styled.div`
  padding: 3.2rem;
`;

export const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const client = useHttp();

  const debouncedParam = useDebounce(param, 200);
  useEffect(() => {
    setLoading(true);
    client("projects?", { data: cleanObject(debouncedParam) })
      .then((list) => {
        setList(list);
        setError(null);
      })
      .catch((error) => {
        setList([]);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
      <List users={users} dataSource={list} loading={loading} />
    </Container>
  );
};
