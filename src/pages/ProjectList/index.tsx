import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import qs from "qs";

const apiUrl = import.meta.env.VITE_API_URL;

const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  const debouncedParam = useDebounce(param, 200);
  useEffect(() => {
    fetch(
      `${apiUrl}projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [debouncedParam]);
  useMount(() => {
    fetch(`${apiUrl}users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};

export default ProjectListPage;
