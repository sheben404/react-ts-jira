import { Divider, List, Popover, Typography } from "antd";
import { useProjectModal } from "pages/ProjectList/utils";
import styled from "styled-components";
import { useProjects } from "utils/projects";
import { ButtonNoPadding } from "./lib";

const ContentContainer = styled.div`
  min-width: 30rem;
`;

export const ProjectPopover = () => {
  const { open } = useProjectModal();
  const { list: projects } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding type={"link"} onClick={open}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};
