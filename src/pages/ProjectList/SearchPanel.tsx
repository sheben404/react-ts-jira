import { Form, Input, Select } from "antd";

export interface User {
  id: string;
  name: string;
  title: string;
  email: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input
          placeholder="项目名称"
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user, index) => (
            <Select.Option key={index} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
