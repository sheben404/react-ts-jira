import { useMemo } from "react";
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

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
