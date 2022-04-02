import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { useHttp } from "../../utils/http";
import styled from "styled-components";

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
  const client = useHttp();

  const debouncedParam = useDebounce(param, 200);
  useEffect(() => {
    client("projects?", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);
  useMount(() => {
    client("users?").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};
