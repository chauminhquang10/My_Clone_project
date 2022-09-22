import { PlusCircleOutlined } from '@ant-design/icons';
import { Form, FormInstance, Input, InputRef, Table, Typography } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './editMachine.less';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

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
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
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

interface DataType {
  key: React.Key;
  deviceType: string;
  unit: string;
  minCap: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export const EditableTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const [count, setCount] = useState(2);

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      deviceType: `Edward King ${count}`,
      unit: '32',
      minCap: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: (
        <div className={styles.deviceTypeCol}>
          <div style={{ textAlign: 'center', flex: 1 }}>Loại thiết bị</div>
          <PlusCircleOutlined onClick={handleAdd} />
        </div>
      ),
      dataIndex: 'deviceType',
      width: '33%',
      editable: true,
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <Typography.Text>Đơn vị tính</Typography.Text>
        </div>
      ),
      dataIndex: 'unit',
      width: '33%',
      editable: true,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Sức chứa tối thiểu</div>,
      dataIndex: 'minCap',
      width: '33%',
      editable: true,
      align: 'right',
    },
  ];

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={false}
      />
    </div>
  );
};
