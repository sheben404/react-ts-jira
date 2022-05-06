import React from "react";
import { useTaskTypes } from "utils/taskType";
import { IdSelect } from "./IdSelect";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes || []} {...props} />;
};
