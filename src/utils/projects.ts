import { Project } from "pages/ProjectList/List";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const {
    run,
    error,
    isLoading: loading,
    data: list,
    ...rest
  } = useAsync<Project[]>();

  const fetchProjects = () =>
    client("projects?", { data: cleanObject(param || {}) });

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [param]);

  return { error, loading, list, ...rest };
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
