import { Project } from "pages/ProjectList/List";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, error, isLoading: loading, data: list } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects?", { data: cleanObject(param || {}) }));
  }, [param]);

  return { error, loading, list };
};
