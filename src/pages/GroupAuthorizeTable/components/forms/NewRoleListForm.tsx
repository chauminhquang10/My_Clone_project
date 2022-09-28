import { ModalForm } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Tree } from 'antd';
import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import type { DataNode, TreeProps } from 'antd/es/tree';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import plusIcon from '@/assets/images/svg/icon/plus-icon.svg';
import minusIcon from '@/assets/images/svg/icon/minus-icon.svg';
import styles from './NewRoleListForm.less';
import { getListRoles } from '@/services/STM-APIs/RoleController';
import { useRequest } from 'umi';
import { MAP_ACTION_LIST, MAP_ROLE_LIST } from '@/constants';

type CreateFormProps = {
  title: string;
  width: string;
  visible: boolean;
  checkAllKeys: (number | string)[];
  setCheckAllKeys: (value: (number | string)[]) => void;
  onVisibleChange: (value: boolean) => void;
  onFinish: (value: { roleGroupName: string }) => Promise<void>;
};

const NewUnitForm: React.FC<CreateFormProps> = ({
  title,
  width,
  checkAllKeys,
  setCheckAllKeys,
  visible,
  onVisibleChange,
  onFinish,
}) => {
  // lưu dữ liệu được fetch từ api và đc xử lí về dạng tree data của antd
  const [formattedRolesData, setFormattedRolesData] = useState<DataNode[]>([]);

  // get all length của cây ,tính cả thằng cha item
  const [allTreeItemsLength, setAllTreeItemsLength] = useState<number>(0);

  // get all child keys
  const [allChildKeys, setAllChildKeys] = useState<number[] | undefined>();

  // xử  lí icon mở rộng tree
  const [expandTreeIndexes, setExpandTreeIndexes] = useState<string[]>([]);

  // xử lí check all

  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  const handleFormatTreeData = (data: API.Role[] | undefined) => {
    const newFormattedData = data?.map((role: API.Role) => ({
      title: role?.name ? MAP_ROLE_LIST[role?.name] : '',
      key: role?.name,
      switcherIcon: (
        <>
          {role?.name && expandTreeIndexes.includes(role?.name) ? (
            <img src={minusIcon} />
          ) : (
            <img src={plusIcon} />
          )}
        </>
      ),
      children: role.actions?.map((actionItem: API.RoleAction) => ({
        title: actionItem?.action ? MAP_ACTION_LIST[actionItem?.action] : '',
        key: actionItem?.id,
      })),
    }));
    return newFormattedData;
  };

  useRequest<API.ResponseBaseListRolesResponse>(
    () => {
      return getListRoles();
    },
    {
      refreshDeps: [expandTreeIndexes],
      onSuccess(data) {
        const formattedResult = handleFormatTreeData(data?.roles);
        const getAllSize = formattedResult?.reduce((prev, formattedItem) => {
          return prev + (formattedItem?.children ? formattedItem?.children.length + 1 : 1);
        }, 0);

        const getAllChildKeys = formattedResult?.reduce((prev: any, resultItem: any) => {
          const allActionKeys = resultItem?.children?.map((childItem: any) => childItem?.key);
          if (allActionKeys) return [...prev, ...allActionKeys];
          return [...prev];
        }, []);

        setAllTreeItemsLength(getAllSize as number);
        setFormattedRolesData(formattedResult as DataNode[]);
        setAllChildKeys(getAllChildKeys as number[]);
      },
    },
  );

  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    const checkedRolesKey = checkedKeys as (number | string)[];
    const checkRolesLength = checkedRolesKey.length;

    setCheckAllKeys(checkedRolesKey);

    // allTreeItemsLength là tính tổng số phần tử trong mảng api trả về kể cả key của thằng cha
    setIndeterminate(!!checkRolesLength && checkRolesLength < allTreeItemsLength);
    setCheckAll(checkRolesLength === allTreeItemsLength);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    // điều kiện true thì sử dụng allChildKeys là mảng giá trị toàn bị key của data từ api trả về
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    setCheckAllKeys(e.target.checked ? [...(allChildKeys as number[])] : []);
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    setIndeterminate(false);
    setCheckAll(false);
    setCheckAllKeys([]);
    setExpandTreeIndexes([]);
    onVisibleChange(false);
  };

  return (
    <ModalForm
      form={form}
      width={width}
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={onFinish}
      modalProps={{
        centered: true,
        closable: false,
        destroyOnClose: true,
        className: styles.myModalForm,
      }}
      submitTimeout={2000}
    >
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>
          <p className={styles.modalTitle}>{title}</p>
        </Col>
        <Col>
          <span onClick={onReset} className={styles.closeIcon}>
            <img src={closeIcon} />
          </span>
        </Col>
      </Row>

      <Row gutter={[0, 15]}>
        <Col span={24}>
          <Form.Item
            name="roleGroupName"
            label="Tên nhóm quyền"
            rules={[{ required: true, message: 'Tên nhóm quyền là băt buộc' }]}
            normalize={(value) => value.trim()}
          >
            <Input placeholder={'Quản trị máy & camera'} />
          </Form.Item>
        </Col>

        <Col
          span={24}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <Row justify="space-between" align="middle">
            <span>Danh sách quyền</span>
            <Checkbox
              indeterminate={indeterminate}
              checked={checkAll}
              onChange={onCheckAllChange}
              className={styles.myAllCheckBox}
            />
          </Row>

          <Row>
            <Tree
              checkedKeys={checkAllKeys}
              checkable
              selectable={false}
              multiple
              onCheck={onCheck}
              treeData={formattedRolesData}
              height={274}
              className={styles.myRoleGroupTree}
              onExpand={(_, { node, expanded }) => {
                if (expanded) setExpandTreeIndexes([...expandTreeIndexes, node.key.toString()]);
                else {
                  const newExpandTreeIndexes = expandTreeIndexes.filter(
                    (item) => item !== node.key.toString(),
                  );
                  setExpandTreeIndexes(newExpandTreeIndexes);
                }
              }}
            />
          </Row>
        </Col>
      </Row>

      <Row align="middle" justify="end" style={{ marginTop: '28px', gap: '16px' }}>
        <Button className={styles.cancelButton} size="large" onClick={onReset}>
          Huỷ bỏ
        </Button>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              className={styles.submitButton}
              size="large"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !checkAllKeys.length ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Hoàn tất
            </Button>
          )}
        </Form.Item>
      </Row>
    </ModalForm>
  );
};

export default NewUnitForm;
