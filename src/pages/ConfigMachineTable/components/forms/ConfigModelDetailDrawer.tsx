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
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { MutableRefObject } from 'react';
import React, { useState } from 'react';
import styles from './ConfigModelDetailDrawer.less';
// import userDetailIcon from '@/assets/images/svg/icon/top-right-arrow.svg';
import { useRequest } from 'umi';
import type { ActionType } from '@ant-design/pro-components';
import { getModelDetail } from '@/services/STM-APIs/STMModelController';

type ConfigModelDetailDrawerProps = {
  showDetail: boolean;
  setShowDetail: (value: boolean) => void;
  currentModel: API.StmModelDetailResponse | undefined;
  setCurrentModel: (value: API.StmModelDetailResponse | undefined) => void;
  detailActionRef: MutableRefObject<ActionType | undefined>;
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
  // detailActionRef,
}) => {
  const configModelColumns: ColumnsType<API.StorageItem> = [
    {
      title: 'Loại thiết bị',
      dataIndex: ['deviceType', 'name'],
      width: '33%',
      sorter: (a, b) => a.deviceType?.name.length - b.deviceType?.name.length,
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Đơn vị tính',
      dataIndex: ['deviceType', 'unit'],
      width: '33%',
      sorter: (a, b) => a?.deviceType?.unit.length - b?.deviceType?.unit.length,
      align: 'left',
      render: (text) => <span>{text}</span>,
    },

    {
      title: 'Sức chứa tối thiểu',
      dataIndex: 'minCapacity',
      key: 'minCapacity',
      width: '33%',
      sorter: (a, b) => a?.minCapacity.length - b?.minCapacity.length,
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

  // xử  lí trạng thái của form chỉnh sửa
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  console.log(updateModalVisible);

  const { data: roleGroupDetail } = useRequest<API.ResponseBaseStmModelDetailResponse>(
    () => {
      return getModelDetail({ modelId: currentModel?.id?.toString() || '' });
    },
    {
      refreshDeps: [currentModel],
    },
  );

  // const handleUpdateRoleGroup = async (value: { roleGroupName: string }) => {
  //   const hide = message.loading('Configuring...');

  //   // lọc bỏ toàn bộ các key có kiểu string, vì nó là key của  thằng item cha
  //   const finalAllKeysData = checkAllKeys.filter((dataKey) => typeof dataKey !== 'string');

  //   try {
  //     await updateRoleGroup(
  //       { groupId: roleGroupDetail?.id?.toString() || '' },
  //       { name: value.roleGroupName, actionIds: finalAllKeysData as number[] },
  //     );
  //     hide();
  //     message.success('Chỉnh sửa nhóm quyền thành công');
  //     handleUpdateModalVisible(false);
  //     setShowDetail(false);
  //     detailActionRef.current?.reload();
  //     return true;
  //   } catch (error) {
  //     hide();
  //     message.error('Configuration failed, please try again!');
  //     return false;
  //   }
  // };

  // const handleRemoveRoleGroup = async () => {
  //   const hide = message.loading('Loading...');
  //   try {
  //     await deleteRoleGroup({ groupId: roleGroupDetail?.id?.toString() || '' });
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
                <h4 className={styles.drawerHeaderTitle}>Chi tiết cấu hình dòng máy</h4>
              </Col>
              <Col span={9}>
                <Row
                  justify="end"
                  align="middle"
                  gutter={8}
                  className={styles.myDrawerHeaderBtnGroup}
                >
                  <Col>
                    <Button
                      icon={<EditOutlined color="#434343" />}
                      className={styles.btnItem}
                      onClick={() => handleUpdateModalVisible(true)}
                    >
                      <span className={styles.btnGroupTitle}>Chỉnh sửa</span>
                    </Button>
                  </Col>
                  <Col>
                    <Tooltip
                      placement="left"
                      title={
                        // canRemoveUnit
                        //   ? 'Xóa'
                        //   : 'Chưa thể xoá. Người dùng hoặc máy chưa có đơn vị quản lý'
                        'Xoá'
                      }
                    >
                      <Button
                        className={styles.btnItem}
                        onClick={() => setOpenConfirmModal(true)}
                        // disabled={canRemoveUnit ? false : true}
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
                <Card title="Thông tin dòng máy" size="small" className={styles.myCard}>
                  <Row gutter={24}>
                    <Col span={8}>
                      <Form.Item name="machineType" label="Loại máy">
                        <Input disabled placeholder={currentModel?.machineType} />
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item name="name" label="Dòng máy">
                        <Input disabled placeholder={currentModel?.name} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col span={24}>
                <Table
                  columns={configModelColumns}
                  dataSource={roleGroupDetail?.storages}
                  bordered
                  title={() => (
                    <UserRoleGroupListTableTitle
                      title="Cấu hình"
                      quantity={roleGroupDetail?.storages?.length}
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
      {/*
        {updateModalVisible && (
          <UpdateRoleListForm
            title="Chỉnh sửa nhóm quyền"
            width="934px"
            roleGroupDetail={roleGroupDetail as API.RoleGroupResponse}
            visible={updateModalVisible}
            onVisibleChange={handleUpdateModalVisible}
            checkAllKeys={checkAllKeys}
            setCheckAllKeys={setCheckAllKeys}
            onFinish={async (value) => {
              await handleUpdateRoleGroup(value as { roleGroupName: string });
            }}
          />
        )} */}

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
                    Bạn có chắc chắn muốn xóa nhóm quyền {roleGroupDetail?.name}?
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
                Huỷ bỏ
              </Button>
              <Button
                className={styles.submitLockModalButton}
                size="large"
                onClick={() => {
                  // handleRemoveRoleGroup();
                  setOpenConfirmModal(false);
                }}
              >
                Xác nhận
              </Button>
            </Row>
          </Col>
        </Modal>
      )}
    </>
  );
};

export default ConfigModelDetailDrawer;
