import {
  EditOutlined,
  ExclamationCircleOutlined,
  PaperClipOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import { Col, Drawer, Form, Input, Row, Card, Table, Tooltip, Badge, message } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState, useRef } from 'react';

import styles from './VersionDetailDrawer.less';
import UpdateVersionForm from './UpdateVersionForm';
import ModalCustom from '@/components/FormCustom/ModalCustom';
import type { ActionType } from '@ant-design/pro-components';
import api from '@/services/STM-APIs';

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
  currentRow: API.VersionResponse | undefined;
  setCurrentRow: (value: API.VersionResponse | undefined) => void;
  children?: React.ReactNode;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

const VersionDetailDrawer: React.FC<VersionDetailDrawerProps> = ({
  showDetail,
  setShowDetail,
  currentRow,
  setCurrentRow,
  actionRef,
}) => {
  const updateModelRef = useRef();
  //------------ handle create new  --------------------
  const handleUpdateVersion = async (
    params: API.updateVersionParams,
    record: API.UpdateVersionRequest,
    file?: File,
  ) => {
    const hide = message.loading('Loading...');
    try {
      const res = await api.STMVersionController.updateVersion(params, { ...record }, file);
      hide();
      if (res.code === 700) {
        message.error(`Lỗi`);
        return;
      }
      message.success('Chỉnh sửa version thành công');
      setShowDetail(false);
      actionRef.current?.reload();
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
    }
  };
  const updatedMachineListColumns: ColumnsType<API.StmInfoResponse> = [
    {
      title: 'Tên máy',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Terminal ID',
      dataIndex: 'terminalId',
      key: 'terminalId',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Địa chỉ IP',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
      align: 'center',
      render: (_, entity) => <span>{entity?.version?.name}</span>,
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
                        <Input disabled placeholder={currentRow?.machineType} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="machineType" label="Dòng máy">
                        <Input disabled placeholder={currentRow?.model?.name} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="versionName" label="Tên phiên bản">
                        <Input disabled placeholder={currentRow?.name} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="condition" label="Điều kiện">
                        <Input disabled placeholder={currentRow?.condition} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="content" label="Nội dung">
                        <Tooltip placement="bottom" title={currentRow?.content}>
                          <div>
                            <Input
                              disabled
                              value={currentRow?.condition}
                              placeholder={currentRow?.condition}
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
                          <span className={styles.fileNameDetail}>{currentRow?.filePath}</span>
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
                  dataSource={currentRow?.updatedMachines}
                  title={() => (
                    <UpdatedMachineListTableTitle
                      title="Máy đã cập nhật"
                      quantity={
                        currentRow.updatedMachines?.length ? currentRow.updatedMachines?.length : 0
                      }
                    />
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
                  dataSource={currentRow?.notUpdatedMachines}
                  title={() => (
                    <NotUpdatedMachineListTableTitle
                      title="Máy chưa cập nhật"
                      quantity={
                        currentRow.notUpdatedMachines?.length
                          ? currentRow.notUpdatedMachines?.length
                          : 0
                      }
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
          </Form>
        )}
      </Drawer>

      <UpdateVersionForm
        title="Chỉnh sửa file nâng cấp"
        width="934px"
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        onFinish={handleUpdateVersion}
        {...currentRow}
        actionRef={updateModelRef}
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
