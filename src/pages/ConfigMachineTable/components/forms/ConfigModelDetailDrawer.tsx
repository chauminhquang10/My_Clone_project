import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Button,
  Card,
  Table,
  Modal,
  Tooltip,
  Space,
  Badge,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import styles from './ConfigModelDetailDrawer.less';
// import userDetailIcon from '@/assets/images/svg/icon/top-right-arrow.svg';
import { useModel, useRequest } from 'umi';
import { getModelDetail, updateModel } from '@/services/STM-APIs/STMModelController';
import UpdateConfigModelForm from './UpdateConfigModel';

import { useIntl, FormattedMessage } from 'umi';

type CustomPhysicalDevice = API.PhysicalDevice & {
  key: React.Key;
  myMinCap: number;
};

type ConfigModelDetailDrawerProps = {
  showDetail: boolean;
  setShowDetail: (value: boolean) => void;
  currentModel: API.StmModelDetailResponse | undefined;
  setCurrentModel: (value: API.StmModelDetailResponse | undefined) => void;

  getAllConfigMachine: () => void;
  children?: React.ReactNode;
};

interface UserRoleGroupListTableTitleProps {
  title: string;
  quantity: number | undefined;
}

const ConfigModelDetailDrawer: React.FC<ConfigModelDetailDrawerProps> = ({
  showDetail,
  setShowDetail,
  currentModel,
  setCurrentModel,
  getAllConfigMachine,
}) => {
  const intl = useIntl();

  const configModelColumns: ColumnsType<API.StorageItem> = [
    {
      title: <FormattedMessage id="detailDrawer_configCard_columnGroup_deviceType" />,
      dataIndex: ['deviceType', 'name'],
      width: '33%',
      sorter: (a, b) => {
        if (a.deviceType?.name && b.deviceType?.name)
          return a.deviceType?.name?.localeCompare(b.deviceType?.name as string);
        return 0;
      },
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: <FormattedMessage id="detailDrawer_configCard_columnGroup_unit" />,
      dataIndex: ['deviceType', 'unit'],
      width: '33%',
      sorter: (a, b) => {
        if (a?.deviceType?.unit && b?.deviceType?.unit)
          return a?.deviceType?.unit?.localeCompare(b?.deviceType?.unit as string);
        return 0;
      },
      align: 'left',
      render: (text) => <span>{text}</span>,
    },

    {
      title: <FormattedMessage id="detailDrawer_configCard_columnGroup_miniCapacity" />,
      dataIndex: 'minCapacity',
      key: 'minCapacity',
      width: '33%',
      sorter: (a, b) => {
        if (a?.minCapacity && b?.minCapacity) return a?.minCapacity - b?.minCapacity;
        return 0;
      },
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
  ];

  const UserRoleGroupListTableTitle: React.FC<UserRoleGroupListTableTitleProps> = ({
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

  // get current user info
  const { initialState } = useModel('@@initialState');

  // xử lí cho phép chỉnh sửa
  const [enableUpdate, setEnableUpdate] = useState<boolean>(true);

  // xử lí cho phép xóa
  const [enableDelete, setEnableDelete] = useState<boolean>(true);

  // xử  lí trạng thái của form chỉnh sửa
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  // xử lí data cho cái bảng god damn editable row
  const [dataSource, setDataSource] = useState<CustomPhysicalDevice[]>([]);

  // xử lí những thiết bị đc chọn để update
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { data: modelDetail } = useRequest<API.ResponseBaseStmModelDetailResponse>(
    () => {
      return getModelDetail({ modelId: currentModel?.id?.toString() || '' });
    },
    {
      onSuccess() {
        if (!initialState?.currentRoles?.update_model) {
          setEnableUpdate(false);
        }

        if (!initialState?.currentRoles?.delete_model) {
          setEnableDelete(false);
        }
      },
      refreshDeps: [currentModel],
    },
  );

  const handleUpdateConfigModel = async (value: { machineType: string; name: string }) => {
    const hide = message.loading('Configuring...');

    try {
      const newDataSource = [...dataSource];
      const newSelectedDataSource = newDataSource?.filter((item) =>
        selectedRowKeys?.includes(item?.id as number),
      );

      const formattedForSendingData = newSelectedDataSource?.map((item) => ({
        deviceTypeId: item?.id,
        minCapacity: item?.myMinCap,
      }));
      await updateModel({ modelId: modelDetail?.id?.toString() || '' }, {
        ...value,
        storages: formattedForSendingData,
      } as API.CreateStmModelRequest);
      hide();
      message.success(
        intl.formatMessage({
          id: 'updateConfigMachine_successStatus_message',
        }),
      );
      handleUpdateModalVisible(false);
      setShowDetail(false);
      getAllConfigMachine();
      return true;
    } catch (error) {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
  };

  // const handleRemoveRoleGroup = async () => {
  //   const hide = message.loading('Loading...');
  //   try {
  //     await deleteRoleGroup({ groupId: modelDetail?.id?.toString() || '' });
  //     setShowDetail(false);
  //     detailActionRef.current?.reloadAndRest?.();
  //     hide();
  //     message.success('Xoá đơn vị thành công');
  //     return true;
  //   } catch (error) {
  //     hide();
  //     message.error('Delete failed, please try again');
  //     return false;
  //   }
  // };

  return (
    <>
      <Drawer
        width={880}
        open={showDetail}
        onClose={() => {
          setCurrentModel(undefined);
          setShowDetail(false);
        }}
        className={styles.myDrawer}
        closable={true}
        headerStyle={{ border: 'none' }}
      >
        <Form layout="vertical" hideRequiredMark>
          <Space size={12} direction={'vertical'}>
            <Row>
              <Col span={15}>
                <h4 className={styles.drawerHeaderTitle}>
                  {intl.formatMessage({
                    id: 'detailDrawer_title',
                  })}
                </h4>
              </Col>
              <Col span={9}>
                <Row
                  justify="end"
                  align="middle"
                  gutter={8}
                  className={styles.myDrawerHeaderBtnGroup}
                >
                  <Col>
                    <Tooltip
                      placement="left"
                      title={
                        enableUpdate ? '' : 'Tài khoản chưa được cho phép truy cập chức năng này'
                      }
                    >
                      <Button
                        icon={<EditOutlined color="#434343" />}
                        className={styles.btnItem}
                        onClick={() => handleUpdateModalVisible(true)}
                        disabled={!enableUpdate}
                      >
                        <span className={styles.btnGroupTitle}>
                          {intl.formatMessage({
                            id: 'edit',
                          })}
                        </span>
                      </Button>
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      placement="left"
                      title={
                        enableDelete
                          ? intl.formatMessage({
                              id: 'delete',
                            })
                          : 'Tài khoản chưa được cho phép truy cập chức năng này'
                      }
                    >
                      <Button
                        className={styles.btnItem}
                        onClick={() => setOpenConfirmModal(true)}
                        disabled={!enableDelete}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={[0, 20]}>
              <Col span={24}>
                <Card
                  title={intl.formatMessage({
                    id: 'detailDrawer_infoCard_title',
                  })}
                  size="small"
                  className={styles.myCard}
                >
                  <Row gutter={24}>
                    <Col span={8}>
                      <Form.Item
                        name="machineType"
                        label={intl.formatMessage({
                          id: 'detailDrawer_inputGroup_machineType_tile',
                        })}
                      >
                        <Input disabled placeholder={currentModel?.machineType} />
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name="name"
                        label={intl.formatMessage({
                          id: 'detailDrawer_inputGroup_machineSeries_tile',
                        })}
                      >
                        <Input disabled placeholder={currentModel?.name} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col span={24}>
                <Table
                  columns={configModelColumns}
                  dataSource={modelDetail?.storages}
                  bordered
                  title={() => (
                    <UserRoleGroupListTableTitle
                      title={intl.formatMessage({
                        id: 'detailDrawer_configCard_title',
                      })}
                      quantity={modelDetail?.storages?.length}
                    />
                  )}
                  className={styles.myTable}
                  pagination={false}
                  scroll={{ y: 560 }}
                />
              </Col>
            </Row>
          </Space>
        </Form>
      </Drawer>

      {updateModalVisible && (
        <UpdateConfigModelForm
          title={intl.formatMessage({
            id: 'configMachine_updateForm_title',
          })}
          width="934px"
          modelDetail={modelDetail as API.StmModelDetailResponse}
          dataSource={dataSource}
          setDataSource={setDataSource}
          visible={updateModalVisible}
          onVisibleChange={handleUpdateModalVisible}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          onFinish={async (value) => {
            await handleUpdateConfigModel(value as { machineType: string; name: string });
          }}
        />
      )}

      {openConfirmModal && (
        <Modal
          footer={null}
          centered
          closable={false}
          visible={openConfirmModal}
          className={styles.myConfirmModal}
        >
          <Col span={24}>
            <Row>
              <Col span={2}>
                <ExclamationCircleOutlined style={{ color: '#FFC53D', fontSize: '22px' }} />
              </Col>
              <Col span={22}>
                <Row align="middle" justify="space-between">
                  <h3 className={styles.lockModalTitle}>Cảnh báo</h3>
                  <CloseOutlined
                    style={{
                      fontSize: '16px',
                      color: 'rgba(0, 0, 0, 0.45)',
                      cursor: 'pointer',
                    }}
                    onClick={() => setOpenConfirmModal(false)}
                  />
                </Row>
                <Row>
                  <span className={styles.lockModalDesc}>
                    Bạn có chắc chắn muốn xóa nhóm quyền {modelDetail?.name}?
                  </span>
                </Row>
              </Col>
            </Row>
            <Row align="middle" justify="end" style={{ gap: '8px', marginTop: '24px' }}>
              <Button
                className={styles.cancelLockModalButton}
                size="large"
                onClick={() => setOpenConfirmModal(false)}
              >
                <FormattedMessage id="cancel" />
              </Button>
              <Button
                className={styles.submitLockModalButton}
                size="large"
                onClick={() => {
                  // handleRemoveRoleGroup();
                  setOpenConfirmModal(false);
                }}
              >
                <FormattedMessage id="update" />
              </Button>
            </Row>
          </Col>
        </Modal>
      )}
    </>
  );
};

export default ConfigModelDetailDrawer;
