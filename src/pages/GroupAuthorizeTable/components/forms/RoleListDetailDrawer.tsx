import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UnlockOutlined,
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
  Avatar,
  Tag,
  Badge,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { MutableRefObject } from 'react';
import React, { useState } from 'react';
import StatusTag from './StatusTag';
import styles from './RoleListDetailDrawer.less';
import userDetailIcon from '@/assets/images/svg/icon/top-right-arrow.svg';
import UpdateRoleListForm from './UpdateRoleListForm';
import { useModel, useRequest } from 'umi';
import {
  deleteRoleGroup,
  getRoleDetail,
  updateRoleGroup,
} from '@/services/STM-APIs/RoleController';
import type { ActionType } from '@ant-design/pro-components';

type RoleListDetailDrawerProps = {
  showDetail: boolean;
  setShowDetail: (value: boolean) => void;
  currentRoleGroup: API.RoleGroupResponse | undefined;
  setCurrentRoleGroup: (value: API.RoleGroupResponse | undefined) => void;
  detailActionRef: MutableRefObject<ActionType | undefined>;
  children?: React.ReactNode;
};

type StaffNameProps = {
  avatar: string;
  name: string;
};

interface UserRoleGroupListTableTitleProps {
  title: string;
  quantity: number | undefined;
}

const INITIAL_VALIDATE_DELETE = {
  enableDeleteBtn: true,
  tooltipMsg: 'Xóa',
};

const StaffNameComponent: React.FC<StaffNameProps> = ({ name, avatar }) => {
  return (
    <div className={styles.staffNameCell}>
      <div className={styles.staffUserInfo}>
        <Avatar src={avatar} size={24} />
        <span>{name}</span>
      </div>
      <div className={styles.visibleUserDetail}>
        <Tooltip placement="bottom" title={'Chi tiết người dùng'}>
          <img src={userDetailIcon} />
        </Tooltip>
      </div>
    </div>
  );
};

const RoleListDetailDrawer: React.FC<RoleListDetailDrawerProps> = ({
  showDetail,
  setShowDetail,
  currentRoleGroup,
  setCurrentRoleGroup,
  detailActionRef,
}) => {
  const userRoleGroupColumns: ColumnsType<Required<API.UserResponse>> = [
    {
      title: 'Mã NV',
      dataIndex: 'staffId',
      key: 'staffId',
      width: '15%',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      sorter: (a, b) => a.name.length - b.name.length,
      align: 'left',
      render: (_, { avatar, name }) => <StaffNameComponent avatar={avatar} name={name} />,
    },

    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '15%',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '25%',
      align: 'left',
      render: (text) => <span style={{ color: '#1890FF' }}>{text}</span>,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      width: '20%',
      align: 'center',
      render: (_, { status }) => (
        <StatusTag title={status} icon={<UnlockOutlined />} type={status} />
      ),
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

  // xử lí trạng thái nút xóa (disable, enable) kèm message khi hiện Tooltip

  const [validateDeleteObj, setValidateDeleteObj] = useState(INITIAL_VALIDATE_DELETE);

  // xử  lí trạng thái của form chỉnh sửa
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  // xử lí dữ liệu check all để send api
  const [checkAllKeys, setCheckAllKeys] = useState<(number | string)[]>([]);

  // get current user info
  const { initialState } = useModel('@@initialState');

  const { data: roleGroupDetail } = useRequest<API.ResponseBaseRoleGroupResponse>(
    () => {
      return getRoleDetail({ groupId: currentRoleGroup?.id?.toString() || '' });
    },
    {
      onSuccess(data) {
        const allActionKeys = data?.actions?.map((eachAction) => eachAction.id);
        setCheckAllKeys(allActionKeys as number[]);

        if (!initialState?.currentUser?.admin) {
          setValidateDeleteObj({
            enableDeleteBtn: false,
            tooltipMsg: 'Tài khoản chưa được cho phép truy cập chức năng này',
          });
          return;
        }

        if (data?.users && data?.users.length > 0) {
          setValidateDeleteObj({
            enableDeleteBtn: false,
            tooltipMsg: 'Chưa thể xoá. Nhóm quyền đã có người sở hữu',
          });
        }
      },
      refreshDeps: [currentRoleGroup],
    },
  );

  const handleUpdateRoleGroup = async (value: { roleGroupName: string }) => {
    const hide = message.loading('Configuring...');

    // lọc bỏ toàn bộ các key có kiểu string, vì nó là key của  thằng item cha
    const finalAllKeysData = checkAllKeys.filter((dataKey) => typeof dataKey !== 'string');

    try {
      await updateRoleGroup(
        { groupId: roleGroupDetail?.id?.toString() || '' },
        { name: value.roleGroupName, actionIds: finalAllKeysData as number[] },
      );
      hide();
      message.success('Chỉnh sửa nhóm quyền thành công');
      handleUpdateModalVisible(false);
      setShowDetail(false);
      detailActionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
  };

  const handleRemoveRoleGroup = async () => {
    const hide = message.loading('Loading...');
    try {
      await deleteRoleGroup({ groupId: roleGroupDetail?.id?.toString() || '' });
      setShowDetail(false);
      detailActionRef.current?.reloadAndRest?.();
      hide();
      message.success('Xoá đơn vị thành công');
      return true;
    } catch (error) {
      hide();
      message.error('Delete failed, please try again');
      return false;
    }
  };

  return (
    <>
      <Drawer
        width={880}
        open={showDetail}
        onClose={() => {
          setCurrentRoleGroup(undefined);
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
                <h4 className={styles.drawerHeaderTitle}>Chi tiết nhóm quyền</h4>
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
                    <Tooltip placement="left" title={validateDeleteObj.tooltipMsg}>
                      <Button
                        disabled={!validateDeleteObj.enableDeleteBtn}
                        className={`${styles.btnItem}  ${
                          validateDeleteObj.enableDeleteBtn ? styles.btnDeleteItem : ''
                        }`}
                        onClick={() => setOpenConfirmModal(true)}
                      >
                        <DeleteOutlined
                          style={validateDeleteObj.enableDeleteBtn ? { color: '#FF4D4F' } : {}}
                        />
                      </Button>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={[0, 20]}>
              <Col span={12} className={styles.roleGroupContainer}>
                <Form.Item name="name" label="Tên nhóm quyền">
                  <Input disabled placeholder={roleGroupDetail?.name} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Card title="Quyền tương ứng" size="small" className={styles.myCard}>
                  <Row gutter={[12, 12]}>
                    {roleGroupDetail?.actions?.map((eachAction: API.RoleAction) => (
                      <Col key={eachAction?.id}>
                        <Tag key={eachAction?.id}>{eachAction?.action}</Tag>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>

              <Col span={24}>
                <Table
                  columns={userRoleGroupColumns as ColumnsType<API.UserResponse>}
                  dataSource={roleGroupDetail?.users}
                  bordered
                  title={() => (
                    <UserRoleGroupListTableTitle
                      title="Nhân viên sở hữu nhóm quyền"
                      quantity={roleGroupDetail?.users?.length}
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
                  handleRemoveRoleGroup();
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

export default RoleListDetailDrawer;
