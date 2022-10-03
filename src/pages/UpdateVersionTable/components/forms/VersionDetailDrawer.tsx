import {
  EditOutlined,
  ExclamationCircleOutlined,
  PaperClipOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import Api from '@/services/STM-APIs';
import {
  Badge,
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';

import ModalCustom from '@/components/FormCustom/ModalCustom';
import api from '@/services/STM-APIs';
import { FormattedMessage, useIntl, useRequest } from 'umi';
import UpdateVersionForm from './UpdateVersionForm';
import styles from './VersionDetailDrawer.less';

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
  getAllUpdatedVersion: () => Promise<API.PageResponseVersionResponse | undefined>;
};

const getVersionDetail = (versionId: string) => () =>
  Api.STMVersionController.getVersion({ versionId }).then((res) => res);

const VersionDetailDrawer: React.FC<VersionDetailDrawerProps> = ({
  showDetail,
  setShowDetail,
  currentRow,
  setCurrentRow,
  getAllUpdatedVersion,
}) => {
  const { data } = useRequest(getVersionDetail(`${currentRow?.id}`), {
    cacheKey: `versionDetail-${currentRow?.id}`,
    refreshDeps: [currentRow?.id],
  });

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
      if (res.code === 504) {
        message.error(`Đã tồn tại tên phiên bản`);
        return;
      }
      message.success('Chỉnh sửa version thành công');
      setShowDetail(false);
      getAllUpdatedVersion();
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };
  const updatedMachineListColumns: ColumnsType<API.StmInfoResponse> = [
    {
      title: <FormattedMessage id="machineName" />,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
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
      title: <FormattedMessage id="ipAddress" />,
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
          <FormattedMessage id="form_buttonGroup_cancelButton_title" />
        </span>
        <span className={`${styles.updateActionTitle} ${styles.confirmUpdateAction}`}>
          <FormattedMessage id="update" />
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
          <Button type="link" icon={<EditOutlined />} onClick={() => setShowUpdateActions(true)}>
            <span>
              <FormattedMessage id="update" />
            </span>
          </Button>
        )}
      </div>
    );
  };

  const VersionInfoCardTitle: React.FC<{ title: string }> = ({ title }) => {
    return (
      <div className={styles.versionInfoCardTitleContainer}>
        <span>{title}</span>
        <Button type="link" icon={<SyncOutlined />} onClick={() => handleUpdateModalVisible(true)}>
          <span>
            <FormattedMessage id="edit" />
          </span>
        </Button>
      </div>
    );
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  const intl = useIntl();

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
        {currentRow?.id && (
          <Form layout="vertical" hideRequiredMark>
            <Row style={{ marginBottom: '12px' }}>
              <h4 className={styles.drawerHeaderTitle}>
                <FormattedMessage id="detailVersionForm.title" />
              </h4>
            </Row>

            <Row gutter={[0, 20]}>
              <Col span={24}>
                <Card
                  title={
                    <VersionInfoCardTitle
                      title={intl.formatMessage({ id: 'detailVersionForm.versionInformation' })}
                    />
                  }
                  size="small"
                  className={styles.myCard}
                >
                  <Row gutter={[24, 12]}>
                    <Col span={8}>
                      <Form.Item
                        name="machineCategory"
                        label={<FormattedMessage id="machineType" />}
                      >
                        <Input disabled placeholder={currentRow?.machineType} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="machineType" label={<FormattedMessage id="model" />}>
                        <Input disabled placeholder={currentRow?.model?.name} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="versionName"
                        label={<FormattedMessage id="detailVersionForm.versionName" />}
                      >
                        <Input disabled placeholder={currentRow?.name} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="condition"
                        label={<FormattedMessage id="newVersionForm.condition" />}
                      >
                        <Input disabled placeholder={currentRow?.condition} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="content"
                        label={<FormattedMessage id="updateVersionTable.description" />}
                      >
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
                      <Form.Item
                        name="fileUpload"
                        label={<FormattedMessage id="newVersionForm.uploadedFile" />}
                      >
                        <div className={styles.detailFileUpload}>
                          <PaperClipOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
                          <Typography.Text
                            ellipsis={{ tooltip: currentRow.filePath }}
                            className={styles.fileNameDetail}
                          >
                            {currentRow?.filePath}
                          </Typography.Text>
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
                  dataSource={data?.updatedMachines}
                  title={() => (
                    <UpdatedMachineListTableTitle
                      title={intl.formatMessage({ id: 'detailVersionForm.updatedMachine' })}
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
                  dataSource={data?.notUpdatedMachines}
                  title={() => (
                    <NotUpdatedMachineListTableTitle
                      title={intl.formatMessage({ id: 'detailVersionForm.notUpdatedMachine' })}
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
        title={intl.formatMessage({ id: 'updateFileForm.title' })}
        width="934px"
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        onFinish={handleUpdateVersion}
        {...currentRow}
      />

      <ModalCustom
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
        buttonList={buttonList}
        descriptionList={descriptionList}
        title={intl.formatMessage({ id: 'header.lockModal.title' })}
        icon={<ExclamationCircleOutlined style={{ color: '#FFC53D', fontSize: '22px' }} />}
      />
    </>
  );
};

export default VersionDetailDrawer;
