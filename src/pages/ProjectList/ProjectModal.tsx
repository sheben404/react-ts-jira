import { Button, Drawer, Form, Spin, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useAddProject, useEditProject } from "utils/projects";
import { useProjectModal, useProjectsQueryKey } from "./utils";
import styled from "styled-components";
import { useEffect } from "react";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/UserSelect";

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();

  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());

  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const title = editingProject ? "编辑项目" : "创建项目";

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  return (
    <Drawer
      forceRender={true}
      onClose={close}
      width={"100%"}
      visible={projectModalOpen}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>

              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder={"请输入部门名称"} />
              </Form.Item>

              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};
