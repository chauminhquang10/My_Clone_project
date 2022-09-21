import Api from '@/services/STM-APIs';
import { openNotification } from '@/utils';
import { Col, Form, Select, Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import React, { useEffect, useMemo, useState } from 'react';
import styles from '../NewUserForm.less';

const { Option } = Select;

function getActionsByRoleGroupId(id?: number, list?: API.RoleGroupResponse[]) {
  if (!id || !list || list.length < 1) return [];

  const foundUnit = list.find((item) => item.id === id);

  if (!foundUnit) return [];
  return foundUnit.actions
    ? foundUnit.actions.map((item) => ({
        value: item.action,
      }))
    : [];
}

interface RoleGroupFieldProps {
  onChangeRoleGroup: (id: number) => void;
  initialValue?: number;
}

const tagRender = (props: CustomTagProps) => {
  const { label } = props;
  return (
    <Tag className={styles.tag} closable={false} style={{ marginRight: 4 }}>
      {label}
    </Tag>
  );
};

const RoleGroupField: React.FC<RoleGroupFieldProps> = ({ onChangeRoleGroup, initialValue }) => {
  const [roleGroupList, setRoleGroupList] = useState<API.RoleGroupResponse[] | undefined>();
  const [selectedValue, setSelectedValue] = useState<number>();

  useEffect(() => {
    if (initialValue) {
      setSelectedValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    const getRoleGroupList = async () => {
      try {
        const res = await Api.RoleController.getAllRoleGroup();
        setRoleGroupList(res.data?.roleGroups);
      } catch (error) {
        console.log('error: ', error);
        openNotification('error', 'Đã có lỗi xảy ra', 'Vui lòng thử lại sau');
      }
    };

    getRoleGroupList();
  }, []);

  const handleSelectChange = (value: number) => {
    setSelectedValue(value);
    onChangeRoleGroup(value);
  };

  const buildActionRow = useMemo(() => {
    if (!selectedValue) return null;

    const initialActionList = getActionsByRoleGroupId(selectedValue, roleGroupList);

    console.log('initial action list: ', initialActionList);

    return (
      <Col span={24} className={styles.roleGroupField}>
        <Form.Item name="actions" label="Quyền tương ứng" initialValue={{ ...initialActionList }}>
          <Select
            mode="multiple"
            tagRender={tagRender}
            style={{ width: '100%' }}
            disabled
            className={styles.selectActions}
          />
        </Form.Item>
      </Col>
    );
  }, [roleGroupList, selectedValue]);

  return (
    <>
      <Col span={24}>
        <Form.Item
          name="roleGroupId"
          label="Nhóm quyền"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn nhóm quyền',
            },
          ]}
          initialValue={initialValue}
        >
          <Select placeholder="Chọn nhóm quyền" onChange={handleSelectChange}>
            {roleGroupList?.map((role) => {
              return (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Col>
      {buildActionRow}
    </>
  );
};

export default RoleGroupField;
