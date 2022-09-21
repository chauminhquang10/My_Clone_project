import { Col, Form, Select, Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import styles from '../NewUserForm.less';

const { Option } = Select;

export function getActionsByRoleGroupId(id?: number, list?: API.RoleGroupResponse[]) {
  if (!id || !list || list.length < 1) return [];

  const foundUnit = list.find((item) => item.id === id);

  if (!foundUnit) return [];
  return foundUnit.actions
    ? foundUnit.actions.map((item) => ({
        value: item.action,
      }))
    : [];
}

const tagRender = (props: CustomTagProps) => {
  const { label } = props;
  return (
    <Tag className={styles.tag} closable={false} style={{ marginRight: 4 }}>
      {label}
    </Tag>
  );
};
interface RoleGroupFieldProps {
  data?: API.RoleGroupResponse[];
  handleSelect: (roleGroupId: number, actions: { value?: string }[]) => void;
}

const RoleGroupField: React.FC<RoleGroupFieldProps> = ({ data, handleSelect }) => {
  const handleSelectChange = (value: number) => {
    if (!value || !handleSelect) return;

    handleSelect(value, getActionsByRoleGroupId(value, data));
  };

  return (
    <>
      <Col span={24}>
        <Form.Item name="roleGroupId" label="Nhóm quyền">
          <Select placeholder="Chọn nhóm quyền" onChange={handleSelectChange}>
            {data?.map((role) => {
              return (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Col>
      <Col span={24} className={styles.roleGroupField}>
        <Form.Item name="actions" label="Quyền tương ứng">
          <Select
            mode="multiple"
            tagRender={tagRender}
            style={{ width: '100%' }}
            disabled
            className={styles.selectActions}
            placeholder="Chọn nhóm quyền"
          />
        </Form.Item>
      </Col>
    </>
  );
};

export default RoleGroupField;
