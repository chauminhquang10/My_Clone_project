import { ModalForm } from '@ant-design/pro-components';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { InputRef, Typography } from 'antd';
import { Button, Col, Form, Input, Row, Select, Table } from 'antd';
import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import styles from './NewConfigModel.less';
// import { useRequest } from 'umi';
import type { FormInstance } from 'antd/es/form/Form';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

type NewConfigModelFormProps = {
  title: string;
  width: string;
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
  onFinish: (values: Partial<API.CreateManagementUnitRequest>) => Promise<void>;
};

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof API.StorageItem;
  record: API.StorageItem;
  handleSave: (record: API.StorageItem) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const NewConfigModelForm: React.FC<NewConfigModelFormProps> = ({
  title,
  width,
  visible,
  onVisibleChange,
  onFinish,
}) => {
  const [newForm] = Form.useForm();

  const onReset = () => {
    newForm.resetFields();
    onVisibleChange(false);
  };

  const [dataSource, setDataSource] = useState<API.StorageItem[]>([
    {
      deviceType: {
        name: 'Thiết bị mặc định',
        unit: 'UNKNOWN',
      },
      minCapacity: 0,
    },
  ]);

  const handleAdd = () => {
    const newData: API.StorageItem = {
      deviceType: {
        name: 'Thiết bị mặc định',
        unit: 'UNKNOWN',
      },
      minCapacity: 0,
    };
    setDataSource([...dataSource, newData]);
  };

  const handleSave = (row: API.StorageItem) => {
    const newData = [...dataSource];

    const index = newData.findIndex((item) => {
      return row.deviceType?.id === item?.deviceType?.id;
    });

    const item = newData[index];

    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string | string[];
  })[] = [
    {
      title: (
        <div className={styles.deviceTypeCol}>
          <div style={{ textAlign: 'center', flex: 1 }}>Loại thiết bị</div>
          <PlusCircleOutlined onClick={handleAdd} />
        </div>
      ),
      dataIndex: ['deviceType', 'name'],
      width: '33%',
      editable: true,
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <Typography.Text>Đơn vị tính</Typography.Text>
        </div>
      ),

      dataIndex: ['deviceType', 'unit'],
      width: '33%',
      editable: true,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Sức chứa tối thiểu</div>,
      dataIndex: 'minCapacity',
      width: '33%',
      editable: true,
      align: 'right',
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: API.StorageItem) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <ModalForm
      form={newForm}
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

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Form.Item name="machineType" label="Loại máy">
            <Select placeholder="Chọn loại máy">
              <Option value="STM">STM</Option>
              <Option value="CDM">CDM</Option>
              <Option value="ATM">ATM</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="name" label="Tên dòng máy">
            <Input placeholder={'Nhập tên dòng máy'} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            columns={columns as ColumnTypes}
            dataSource={dataSource}
            bordered
            title={undefined}
            className={styles.myTable}
            pagination={false}
          />
        </Col>
      </Row>

      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button className={styles.cancelButton} size="large" onClick={onReset}>
          Huỷ bỏ
        </Button>
        <Button className={styles.submitButton} size="large" htmlType="submit">
          Hoàn tất
        </Button>
      </Row>
    </ModalForm>
  );
};

export default NewConfigModelForm;
