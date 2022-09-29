import { ModalForm } from '@ant-design/pro-components';
import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Badge } from 'antd';
import { Typography } from 'antd';
import { Button, Col, Form, Input, InputNumber, Row, Select, Table } from 'antd';
import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import styles from './NewConfigModel.less';
import type { FormInstance } from 'antd/es/form/Form';
import { SyncOutlined } from '@ant-design/icons';
import { getAllDevices } from '@/services/STM-APIs/PhysicalDevicesController';
import { useRequest } from 'umi';

import { useIntl, FormattedMessage } from 'umi';

const { Option } = Select;

type CustomPhysicalDevice = API.PhysicalDevice & {
  key: React.Key;
  myMinCap: number;
};

const EditableContext = React.createContext<FormInstance<any> | null>(null);

type NewConfigModelFormProps = {
  title: string;
  width: string;
  visible: boolean;
  dataSource: CustomPhysicalDevice[];
  setDataSource: (value: CustomPhysicalDevice[]) => void;
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: (value: React.Key[]) => void;
  onVisibleChange: (value: boolean) => void;
  onFinish: (value: { machineType: string; name: string }) => Promise<boolean | undefined>;
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
  dataIndex: keyof CustomPhysicalDevice;
  record: CustomPhysicalDevice;
  handleSave: (record: CustomPhysicalDevice) => void;
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
          { required: true, message: 'Sức chứa tối thiểu là băt buộc' },
          { min: 0, max: 1000000, type: 'number', message: 'Tối đa 1.000.000' },
        ]}
      >
        <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} style={{ width: '100%' }} />
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

interface UpdatedMachineListTableTitleProps {
  tableTitle: string;
  quantity: number;
}

const NewConfigModelForm: React.FC<NewConfigModelFormProps> = ({
  title,
  width,
  visible,
  dataSource,
  selectedRowKeys,
  setSelectedRowKeys,
  setDataSource,
  onVisibleChange,
  onFinish,
}) => {
  const intl = useIntl();

  //  xử lí update action cho table
  const [showUpdateActions, setShowUpdateActions] = useState<boolean>(false);

  // những key để show trong select list
  const [showSelectedRowKeys, setShowSelectedRowKeys] = useState<React.Key[]>([]);

  const [newForm] = Form.useForm();

  // get all physical device type
  useRequest<API.ResponseBasePhysicalDevicesResponse>(
    () => {
      return getAllDevices();
    },
    {
      onSuccess(data) {
        const formattedData =
          data?.devices && data?.devices.map((item) => ({ ...item, key: item?.id, myMinCap: 0 }));
        setDataSource(formattedData as CustomPhysicalDevice[]);
        const getAllSelectedRowKeys = data?.devices && data?.devices.map((item) => item?.id);
        setSelectedRowKeys(getAllSelectedRowKeys as React.Key[]);
        setShowSelectedRowKeys(getAllSelectedRowKeys as React.Key[]);
      },
    },
  );

  const onReset = () => {
    newForm.resetFields();
    onVisibleChange(false);
  };

  const handleSave = (row: CustomPhysicalDevice) => {
    const newData = [...dataSource];

    const index = newData.findIndex((item) => {
      return row?.id === item?.id;
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
    dataIndex?: string;
  })[] = [
    {
      title: (
        <div style={{ textAlign: 'center', flex: 1 }}>
          <Typography.Text>
            {intl.formatMessage({
              id: 'detailDrawer_configCard_columnGroup_deviceType',
            })}
          </Typography.Text>
        </div>
      ),
      dataIndex: 'name',
      width: '33%',
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <Typography.Text>
            {intl.formatMessage({
              id: 'detailDrawer_configCard_columnGroup_unit',
            })}
          </Typography.Text>
        </div>
      ),
      dataIndex: 'unit',
      width: '33%',
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <Typography.Text>
            {intl.formatMessage({
              id: 'detailDrawer_configCard_columnGroup_miniCapacity',
            })}
          </Typography.Text>
        </div>
      ),
      dataIndex: 'myMinCap',
      editable: true,
      width: '33%',
      align: 'right',
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: CustomPhysicalDevice) => ({
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

  const NotUpdateMachineActions: React.FC = () => {
    return (
      <div className={styles.NotUpdateMachineActionsContainer}>
        <span
          className={`${styles.updateActionTitle} ${styles.cancelUpdateAction}`}
          onClick={() => {
            setShowUpdateActions(false);
            setShowSelectedRowKeys(selectedRowKeys);
          }}
        >
          <FormattedMessage id="cancel" />
        </span>
        <span
          className={`${styles.updateActionTitle} ${styles.confirmUpdateAction}`}
          onClick={() => {
            setShowUpdateActions(false);
            setSelectedRowKeys(showSelectedRowKeys);
          }}
        >
          <FormattedMessage id="form_buttonGroup_confirmButton_title" />
        </span>
      </div>
    );
  };

  const NotUpdatedMachineListTableTitle: React.FC<UpdatedMachineListTableTitleProps> = ({
    tableTitle,
    quantity,
  }) => {
    return (
      <div className={styles.notUpdatedMachineListTableTitleContainer}>
        <div className={styles.machineListTableTitle}>
          <span>{tableTitle}</span>
          <Badge count={quantity} style={{ backgroundColor: '#E6F7FF', color: '#1890FF' }} />
        </div>

        {showUpdateActions ? (
          <NotUpdateMachineActions />
        ) : (
          <div className={styles.machineListTableTitle} onClick={() => setShowUpdateActions(true)}>
            <SyncOutlined style={{ fontSize: '14px', color: '#1890FF' }} />
            <span className={styles.updateMachineActionTitle}>
              <FormattedMessage id="update" />
            </span>
          </div>
        )}
      </div>
    );
  };

  const rowSelection = {
    selectedRowKeys: showSelectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setShowSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <ModalForm
      form={newForm}
      width={width}
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (e) => {
        const success = await onFinish(e);
        if (success) onReset();
      }}
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
          <Form.Item
            name="machineType"
            label={intl.formatMessage({
              id: 'form_inputGroup_machineType_title',
            })}
            rules={[{ required: true, message: 'Loại máy là băt buộc' }]}
          >
            <Select
              placeholder={intl.formatMessage({
                id: 'form_inputGroup_machineType_placeholder',
              })}
            >
              <Option value="STM">STM</Option>
              <Option value="CDM">CDM</Option>
              <Option value="ATM">ATM</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="name"
            label={intl.formatMessage({
              id: 'form_inputGroup_machineSeries_title',
            })}
            rules={[
              { required: true, message: 'Tên dòng máy là băt buộc' },
              { max: 100, message: 'Tối đa 100 kí tự' },
            ]}
            normalize={(value) => value.trim()}
          >
            <Input
              placeholder={intl.formatMessage({
                id: 'form_inputGroup_machineSeries_placeholder',
              })}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            columns={columns as ColumnTypes}
            dataSource={dataSource}
            bordered
            title={() => (
              <NotUpdatedMachineListTableTitle
                tableTitle="Danh sách thiết bị"
                quantity={selectedRowKeys.length ? selectedRowKeys.length : 0}
              />
            )}
            className={styles.myTable}
            pagination={false}
            scroll={{ y: 200 }}
            rowSelection={
              showUpdateActions
                ? {
                    type: 'checkbox',
                    ...rowSelection,
                  }
                : undefined
            }
          />
        </Col>
      </Row>

      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button className={styles.cancelButton} size="large" onClick={onReset}>
          <FormattedMessage id="cancel" />
        </Button>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              className={styles.submitButton}
              size="large"
              htmlType="submit"
              disabled={
                !newForm.isFieldsTouched(true) ||
                !selectedRowKeys.length ||
                !!newForm.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              <FormattedMessage id="form_buttonGroup_submitButton_title" />,
            </Button>
          )}
        </Form.Item>
      </Row>
    </ModalForm>
  );
};

export default NewConfigModelForm;
