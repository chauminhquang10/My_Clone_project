import UserDetailStatus from '@/pages/TableList/components/UserDetailStatus';
import UserHistoryAction from '@/pages/TableList/components/UserHistoryAction';
import { CloseOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Button,
  Avatar,
  Space,
  Card,
  Table,
  Modal,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import lockIcon from '@/assets/images/svg/icon/Locked.svg';
import styles from './machineDetailDrawer.less';

interface DataType {
  staffId: string;
  action: string;
  createdTime: Date;
}

type UserRole = {
  roleName: string;
  roleDetails: string[];
};

type UserDrawerProps = {
  showDetail: boolean;
  setShowDetail: (value: boolean) => void;
  currentRow: API.RuleListItem | undefined;
  setCurrentRow: (value: API.RuleListItem | undefined) => void;
  userAvatar: string;
  userInfo?: {
    userId: string;
    phoneNumber: string;
    email: string;
  };
  unitInfo?: {
    unitId: string;
    unitAddress: string;
  };
  roles?: UserRole[];
  children?: React.ReactNode;
};

const MachineDetailDrawer: React.FC<UserDrawerProps> = ({
  showDetail,
  setShowDetail,
  currentRow,
  setCurrentRow,
  userAvatar,
  userInfo,
  unitInfo,
  roles,
}) => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Người thực hiện',
      dataIndex: 'staffId',
      key: 'staffId',
      align: 'left',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Hành động',
      key: 'action',
      dataIndex: 'action',
      align: 'left',
      render: (_, { action }) => <UserHistoryAction action={action} />,
    },
    {
      title: 'Ngày thực hiện',
      key: 'createdTime',
      align: 'center',
      render: (_, { createdTime }) => <span>{createdTime.toLocaleDateString()}</span>,
    },
  ];

  const data: DataType[] = [
    {
      staffId: '1',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '2',
      action: 'lock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
  ];

  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  return (
    <PageContainer>
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
            <Row>
              <Col span={15} className={styles.stmHeader}>
                <Typography.Title level={4}>Machine name</Typography.Title>
                <Typography.Text className={styles.machineLocation}>
                  228-230 Ngô Gia Tự, Phường 4, Quận 10, Thành phố Hồ Chí Minh
                </Typography.Text>
              </Col>
              <Col span={9}>
                <Row
                  justify="end"
                  align="middle"
                  gutter={8}
                  className={styles.myDrawerHeaderBtnGroup}
                >
                  <Col>
                    <Button icon={<EditOutlined color="#434343" />} className={styles.btnItem}>
                      <span className={styles.btnGroupTitle}>Chỉnh sửa</span>
                    </Button>
                  </Col>
                  <Col>
                    <Tooltip placement="left" title="Prompt Text">
                      <Button className={styles.btnItem} onClick={() => setOpenConfirmModal(true)}>
                        <img src={lockIcon} />
                      </Button>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row align="middle" justify="center">
              <Col className={styles.avatarGroupContainer}>
                <Space size={12} direction={'vertical'}>
                  <Row align="middle" justify="center">
                    <Avatar
                      className={styles.avatarItem}
                      src={
                        userAvatar
                          ? userAvatar
                          : 'data:image/jpeg;base64,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'
                      }
                    />
                  </Row>
                  <Row align="middle" justify="center">
                    <UserDetailStatus status="inActive" />
                  </Row>
                </Space>
              </Col>
            </Row>

            <Row gutter={[0, 24]}>
              <Col span={24}>
                <Card title="Thông tin người dùng" size="small" className={styles.myCard}>
                  <Row gutter={24}>
                    <Col span={8}>
                      <Form.Item name="staffName" label="Mã - Tên nhân viên quản lý">
                        <Input disabled placeholder={userInfo ? userInfo.userId : 'example'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="phoneNumber" label="Số điện thoại">
                        <Input disabled placeholder={userInfo ? userInfo.phoneNumber : 'example'} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="email" label="Email">
                        <Input disabled placeholder={userInfo ? userInfo.email : 'example'} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col span={24}>
                <Card title="Đơn vị quản lý" size="small" className={styles.myCard}>
                  <Row gutter={24}>
                    <Col span={8}>
                      <Form.Item name="unitName" label="Mã - Tên đơn vị">
                        <Input disabled placeholder={unitInfo ? unitInfo.unitId : 'example'} />
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item name="address" label="Địa chỉ đơn vị">
                        <Input disabled placeholder={unitInfo ? unitInfo.unitAddress : 'example'} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {roles && roles.length > 0 && (
                <Col span={24}>
                  <Card title="Nhóm quyền" size="small" className={styles.myCard}>
                    <Row gutter={[24, 24]}>
                      {roles.map((role, roleIndex) => {
                        const key = roleIndex + 1;
                        return (
                          <Col span={8} key={key}>
                            <Form.Item
                              name="machineRole"
                              label={role ? role.roleName : 'Tên resource'}
                            >
                              <ul className={styles.roleList}>
                                {role?.roleDetails.map((roleItem, roleItemIndex) => {
                                  const id = roleItemIndex + 1;
                                  return (
                                    <li className={styles.roleListItem} key={id}>
                                      {roleItem ? roleItem : 'Action'}
                                    </li>
                                  );
                                })}
                              </ul>
                            </Form.Item>
                          </Col>
                        );
                      })}
                    </Row>
                  </Card>
                </Col>
              )}

              <Col span={24}>
                <Table
                  columns={columns}
                  dataSource={data}
                  bordered
                  title={() => 'Lịch sử'}
                  className={styles.myTable}
                  pagination={false}
                  scroll={{ y: 200 }}
                />
              </Col>
            </Row>
          </Form>
        )}
      </Drawer>

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
                <h3 className={styles.lockModalTitle}>Tạm khoá người dùng</h3>
                <CloseOutlined
                  style={{ fontSize: '16px', color: 'rgba(0, 0, 0, 0.45)', cursor: 'pointer' }}
                  onClick={() => setOpenConfirmModal(false)}
                />
              </Row>
              <Row>
                <span className={styles.lockModalDesc}>
                  Bạn có chắc chắn muốn tạm khóa mã nhân viên - tên nhân viên?{' '}
                </span>
                <span className={styles.lockModalDesc}>
                  Người dùng này sẽ không thể truy cập vào hệ thống.
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
              onClick={() => setOpenConfirmModal(false)}
            >
              Xác nhận
            </Button>
          </Row>
        </Col>
      </Modal>
    </PageContainer>
  );
};

export default MachineDetailDrawer;
