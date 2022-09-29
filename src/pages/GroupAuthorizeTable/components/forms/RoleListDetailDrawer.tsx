import userDetailIcon from '@/assets/images/svg/icon/top-right-arrow.svg';
import { UserCellStatus, UserStatusCell } from '@/components/TableProperties/TableCell';
import { MAP_ACTION_LIST } from '@/constants';
import {
  deleteRoleGroup,
  getRoleDetail,
  updateRoleGroup,
} from '@/services/STM-APIs/RoleController';
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import { useIntl, useRequest } from 'umi';
import styles from './RoleListDetailDrawer.less';
import UpdateRoleListForm from './UpdateRoleListForm';

import { FormattedMessage } from 'umi';

type RoleListDetailDrawerProps = {
  showDetail: boolean;
  setShowDetail: (value: boolean) => void;
  currentRoleGroup: API.RoleGroupResponse | undefined;
  setCurrentRoleGroup: (value: API.RoleGroupResponse | undefined) => void;
  runGetAllRolesGroup: () => void;
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
  runGetAllRolesGroup,
}) => {
  const intl = useIntl();

  const userRoleGroupColumns: ColumnsType<Required<API.UserResponse>> = [
    {
      title: <FormattedMessage id="detailDrawer_roleGroup_ownerCard_columnGroup_staffCode" />,
      dataIndex: 'staffId',
      key: 'staffId',
      width: '15%',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: <FormattedMessage id="detailDrawer_roleGroup_ownerCard_columnGroup_staffName" />,
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      sorter: (a, b) => a.name.length - b.name.length,
      align: 'left',
      render: (_, { avatar, name }) => <StaffNameComponent avatar={avatar} name={name} />,
    },

    {
      title: (
        <FormattedMessage id="detailDrawer_roleGroup_ownerCard_columnGroup_staffPhoneNumber" />
      ),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '15%',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: <FormattedMessage id="detailDrawer_roleGroup_ownerCard_columnGroup_staffEmail" />,
      dataIndex: 'email',
      key: 'email',
      width: '25%',
      align: 'left',
      render: (text) => <span style={{ color: '#1890FF' }}>{text}</span>,
    },
    {
      title: <FormattedMessage id="detailDrawer_roleGroup_ownerCard_columnGroup_staffStatus" />,
      key: 'status',
      dataIndex: 'status',
      width: '20%',
      align: 'center',
      render: (_, { status }) => <UserStatusCell status={UserCellStatus[status]} />,
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

  const { data: roleGroupDetail } = useRequest<API.ResponseBaseRoleGroupResponse>(
    () => {
      return getRoleDetail({ groupId: currentRoleGroup?.id?.toString() || '' });
    },
    {
      onSuccess(data) {
        const allActionKeys = data?.actions?.map((eachAction) => eachAction.id);
        setCheckAllKeys(allActionKeys as number[]);

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
      message.success(
        intl.formatMessage({
          id: 'updateRoleGroup_successStatus_message',
        }),
      );
      handleUpdateModalVisible(false);
      setShowDetail(false);
      runGetAllRolesGroup();
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
      runGetAllRolesGroup();
      hide();
      message.success(
        intl.formatMessage({
          id: 'deleteRoleGroup_successStatus_message',
        }),
      );
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
                    <Button
                      icon={<EditOutlined color="#434343" />}
                      className={styles.btnItem}
                      onClick={() => handleUpdateModalVisible(true)}
                    >
                      <span className={styles.btnGroupTitle}>
                        {intl.formatMessage({
                          id: 'buttonGroup_edit',
                        })}
                      </span>
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
                <Form.Item
                  name="name"
                  label={intl.formatMessage({
                    id: 'detailDrawer_inputGroup_tile',
                  })}
                >
                  <Input disabled placeholder={roleGroupDetail?.name} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Card
                  title={intl.formatMessage({
                    id: 'detailDrawer_correspondingRole_cardTile',
                  })}
                  size="small"
                  className={styles.myCard}
                >
                  <Row gutter={[12, 12]}>
                    {roleGroupDetail?.actions?.map((eachAction: API.RoleAction) => (
                      <Col key={eachAction?.id}>
                        <Tag key={eachAction?.id}>
                          {eachAction?.action ? MAP_ACTION_LIST[eachAction?.action] : ''}
                        </Tag>
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
                      title={intl.formatMessage({
                        id: 'detailDrawer_roleGroup_ownerCard_title',
                      })}
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
          title={intl.formatMessage({
            id: 'updateForm_title',
          })}
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
                  <h3 className={styles.lockModalTitle}>Warning</h3>
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
                    Are you sure that you want to delete {roleGroupDetail?.name}?
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
                  handleRemoveRoleGroup();
                  setOpenConfirmModal(false);
                }}
              >
                <FormattedMessage id="form_buttonGroup_confirmButton_title" />
              </Button>
            </Row>
          </Col>
        </Modal>
      )}
    </>
  );
};

export default RoleListDetailDrawer;
