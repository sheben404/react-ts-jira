import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { useHttp } from "../../utils/http";

const apiUrl = import.meta.env.VITE_API_URL;

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
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
