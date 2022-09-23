import {
  EditOutlined,
  ExclamationCircleOutlined,
  PaperClipOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import { Col, Drawer, Form, Input, Row, Card, Table, Tooltip, Badge } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';

import styles from './VersionDetailDrawer.less';
import UpdateVersionForm from './UpdateVersionForm';
import ModalCustom from '@/components/FormCustom/ModalCustom';

// xử lí phần key này bằng cách format lại data trả về từ API
// thêm trường key này vào với giá trị bằng machineId
// extend cái interface MachineDataType với trường mới là key
interface MachineDataType {
  key: React.Key;
  machineName: string;
  machineId: string;
  IPAddress: string;
  version: string;
}

interface UpdatedMachineListTableTitleProps {
  title: string;
  quantity: number;
}

type ButtonType = {
  title: string;
  action: () => void;
  type: 'out-line' | 'warning' | 'confirm';
};

type VersionDetailDrawerProps = {
  showDetail: boolean;
  setShowDetail: (value: boolean) => void;
  currentRow: API.ManagementUnitResponse | undefined;
  setCurrentRow: (value: API.ManagementUnitResponse | undefined) => void;
  children?: React.ReactNode;
};

const VersionDetailDrawer: React.FC<VersionDetailDrawerProps> = ({
  showDetail,
  setShowDetail,
  currentRow,
  setCurrentRow,
}) => {
  const updatedMachineListColumns: ColumnsType<MachineDataType> = [
    {
      title: 'Tên máy',
      dataIndex: 'machineName',
      key: 'machineName',
      align: 'left',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Terminal ID',
      dataIndex: 'machineId',
      key: 'machineId',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Địa chỉ IP',
      dataIndex: 'IPAddress',
      key: 'IPAddress',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
  ];

  const updatedMachineListData: MachineDataType[] = [
    {
      key: '1',
      machineName: 'Test Machine',
      machineId: '1',
      IPAddress: 'Test IP',
      version: 'quangdeptrai',
    },
    {
      key: '2',
      machineName: 'Test Machine',
      machineId: '2',
      IPAddress: 'Test IP',
      version: 'quangdeptrai',
    },
    {
      key: '3',
      machineName: 'Test Machine',
      machineId: '3',
      IPAddress: 'Test IP',
      version: 'quangdeptrai',
    },
    {
      key: '4',
      machineName: 'Test Machine',
      machineId: '4',
      IPAddress: 'Test IP',
      version: 'quangdeptrai',
    },
    {
      key: '5',
      machineName: 'Test Machine',
      machineId: '5',
      IPAddress: 'Test IP',
      version: 'quangdeptrai',
    },
    {
      key: '6',
      machineName: 'Test Machine',
      machineId: '6',
      IPAddress: 'Test IP',
      version: 'quangdeptrai',
    },
  ];
  // xử  lí trạng thái của form chỉnh sửa
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  //  xử lí update action cho form máy chưa cập nhật
  const [showUpdateActions, setShowUpdateActions] = useState<boolean>(false);

  // xử lí những máy đc chọn để update
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  //------------- Declare Modal --------------------------------
  //------------- Button List --------------------

  const buttonList: ButtonType[] = [
    {
      title: 'Huỷ bỏ',
      type: 'out-line',
      action: () => {
        setOpenConfirmModal(false);
      },
    },
    {
      title: 'Xác nhận',
      type: 'warning',
      action: () => {},
    },
  ];

  //------------- Description List --------------------------------

  const descriptionList: string[] = [
    'Bạn có chắc chắn muốn tạm khóa ?',
    'Người dùng này sẽ không thể truy cập vào hệ thống.',
  ];
  const UpdatedMachineListTableTitle: React.FC<UpdatedMachineListTableTitleProps> = ({
    title,
    quantity,
  }) => {
    return (
      <div className={styles.machineListTableTitle}>
        <span>{title}</span>
        <Badge count={quantity} style={{ backgroundColor: '#E6F7FF', color: '#1890FF' }} />
      </div>
    );
  };

  const NotUpdateMachineActions: React.FC = () => {
    return (
      <div className={styles.NotUpdateMachineActionsContainer}>
        <span
          className={`${styles.updateActionTitle} ${styles.cancelUpdateAction}`}
          onClick={() => setShowUpdateActions(false)}
        >
          Huỷ bỏ
        </span>
        <span className={`${styles.updateActionTitle} ${styles.confirmUpdateAction}`}>
          Cập nhật
        </span>
      </div>
    );
  };

  const NotUpdatedMachineListTableTitle: React.FC<UpdatedMachineListTableTitleProps> = ({
    title,
    quantity,
  }) => {
    return (
      <div className={styles.notUpdatedMachineListTableTitleContainer}>
        <div className={styles.machineListTableTitle}>
          <span>{title}</span>
          <Badge count={quantity} style={{ backgroundColor: '#E6F7FF', color: '#1890FF' }} />
        </div>

        {showUpdateActions ? (
          <NotUpdateMachineActions />
        ) : (
          <div className={styles.machineListTableTitle} onClick={() => setShowUpdateActions(true)}>
            <SyncOutlined style={{ fontSize: '14px', color: '#1890FF' }} />
            <span className={styles.updateMachineActionTitle}>Cập nhật</span>
          </div>
        )}
      </div>
    );
  };

  const VersionInfoCardTitle: React.FC<{ title: string }> = ({ title }) => {
    return (
      <div className={styles.versionInfoCardTitleContainer}>
        <span>{title}</span>
        <div
          className={styles.updateVersionInfoContainer}
          onClick={() => handleUpdateModalVisible(true)}
        >
          <EditOutlined style={{ fontSize: '14px', color: '#1890FF' }} />
          <span className={styles.updateVersionInfoActionTitle}>Chỉnh sửa</span>
        </div>
      </div>
    );
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <>
      <Drawer
        width={880}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        className={styles.myDrawer}
        closable={true}
        headerStyle={{ border: 'none' }}
      >
        {currentRow?.name && (
          <Form layout="vertical" hideRequiredMark>
            <Row style={{ marginBottom: '12px' }}>
              <h4 className={styles.drawerHeaderTitle}>Chi tiết file nâng cấp</h4>
            </Row>

            <Row gutter={[0, 20]}>
              <Col span={24}>
                <Card
                  title={<VersionInfoCardTitle title="Thông tin phiên bản" />}
                  size="small"
                  className={styles.myCard}
                >
                  <Row gutter={[24, 12]}>
                    <Col span={8}>
                      <Form.Item name="machineCategory" label="Loại máy">
                        <Input disabled placeholder={'Smart Teller Machine'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="machineType" label="Dòng máy">
                        <Input disabled placeholder={'example'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="versionName" label="Tên phiên bản">
                        <Input disabled placeholder={'example'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="condition" label="Điều kiện">
                        <Input disabled placeholder={'example'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="content" label="Nội dung">
                        <Tooltip
                          placement="bottom"
                          title={'Lorem ipsum dolor sit , consectetur adipiscing elit.'}
                        >
                          <div>
                            <Input
                              disabled
                              value={'Lorem ipsum dolor sit , consectetur adipiscing elit.'}
                              placeholder={'Lorem ipsum dolor sit , consectetur adipiscing elit.'}
                              style={{ cursor: 'pointer' }}
                            />
                          </div>
                        </Tooltip>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="fileUpload" label="File tải">
                        <div className={styles.detailFileUpload}>
                          <PaperClipOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
                          <span className={styles.fileNameDetail}>File name</span>
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col span={24}>
                <Table
                  bordered
                  columns={updatedMachineListColumns}
                  dataSource={updatedMachineListData}
                  title={() => (
                    <UpdatedMachineListTableTitle title="Máy đã cập nhật" quantity={99} />
                  )}
                  className={styles.myTable}
                  pagination={false}
                  scroll={{ y: 200 }}
                />
              </Col>

              <Col span={24}>
                <Table
                  bordered
                  columns={updatedMachineListColumns}
                  dataSource={updatedMachineListData}
                  title={() => (
                    <NotUpdatedMachineListTableTitle title="Máy chưa cập nhật" quantity={99} />
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
          </Form>
        )}
      </Drawer>

      <UpdateVersionForm
        title="Chỉnh sửa file nâng cấp"
        width="934px"
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        onFinish={async () => {
          // const success = await handleAdd(value as API.RuleListItem);
          // if (success) {
          //   handleUpdateModalVisible(false);
          //   if (actionRef.current) {
          //     actionRef.current.reload();
          //   }
          //   return true;
          // }
          handleUpdateModalVisible(false);
          return false;
        }}
      />

      <ModalCustom
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
        buttonList={buttonList}
        descriptionList={descriptionList}
        title="Tạm khoá người dùng"
        icon={<ExclamationCircleOutlined style={{ color: '#FFC53D', fontSize: '22px' }} />}
      />
    </>
  );
};

export default VersionDetailDrawer;
