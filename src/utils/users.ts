import { User } from "pages/ProjectList/SearchPanel";
import { useMount } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

export const useUsers = () => {
  const client = useHttp();
  const { run, data: users } = useAsync<User[]>();

  useMount(() => {
    run(client("users?"));
  });

  return { users };
};
