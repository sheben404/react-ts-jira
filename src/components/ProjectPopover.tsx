import { Divider, List, Popover, Typography } from "antd";
import styled from "styled-components";
import { useProjects } from "utils/projects";
import { ButtonNoPadding } from "./lib";

const ContentContainer = styled.div`
  min-width: 30rem;
`;

export const ProjectPopover = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
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
      <ButtonNoPadding
        type={"link"}
        onClick={() => props.setProjectModalOpen(true)}
      >
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
