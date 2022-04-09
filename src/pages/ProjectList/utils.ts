import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";
import { useProject } from "utils/projects";
import { useUrlQueryParam } from "utils/url";

export const useProjectSearchParam = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const projectsParam = {
    ...param,
    // 如果 Number(param.personId) 为 0，则结果为 undefined
    personId: Number(param.personId) || undefined,
  };
  return [useMemo(() => projectsParam, [param]), setParam] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const [, setUrlParams] = useSearchParams();

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () =>
    setUrlParams(
      cleanObject({
        projectCreate: "",
        editingProjectId: "",
      }) as URLSearchParamsInit
    );
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || !!editingProject,
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
