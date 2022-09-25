import { blockUser, unBlockUser } from '@/services/STM-APIs/UserController';
import {
  CloseOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { Button, Col, message, Modal, Row, Tooltip } from 'antd';
import { useState } from 'react';
import UpdateUserForm from '../../forms/UpdateUserForm';
import styles from '../UserDetailDrawer.less';

interface HeaderProps {
  userInfo: API.UserDetailResponse;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  onCloseDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ userInfo, actionRef, onCloseDrawer }) => {
  const [openUpdateUserForm, setOpenUpdateUserForm] = useState<boolean>(false);
  const [openBlockUserConfirm, setOpenBlockUserConfirm] = useState<boolean>(false);
  const [isLoadingBlockUserButton, setIsLoadingBlockUserButton] = useState<boolean>(false);

  const handleBlockUser = async () => {
    if (!userInfo.id) {
      message.error('Block user failed');
      setOpenBlockUserConfirm(false);
      return;
    }

    try {
      await blockUser({ userId: userInfo.id as string });
      message.success('Block user successfully');
      actionRef.current?.reload();
      onCloseDrawer();
    } catch (error) {
      console.log('error: ', error);
    }

    setOpenBlockUserConfirm(false);
  };

  const handleUnBlockUser = async () => {
    setIsLoadingBlockUserButton(true);
    if (!userInfo.id) {
      message.error('Unblock user failed');
      setOpenBlockUserConfirm(false);
      return;
    }

    try {
      await unBlockUser({ userId: userInfo.id as string });
      message.success('Unblock user successfully');
      actionRef.current?.reload();
      onCloseDrawer();
    } catch (error) {
      console.log('error: ', error);
    }
    setIsLoadingBlockUserButton(false);
  };

  const handleBlockUserClick = () => {
    if (userInfo.status === 'ACTIVE') {
      setOpenBlockUserConfirm(true);
      return;
    }

    handleUnBlockUser();
  };

  return (
    <>
      <Row>
        <Col span={15}>
          <h4 className={styles.drawerHeaderTitle}>Chi tiết người dùng</h4>
        </Col>
        <Col span={9}>
          <Row justify="end" align="middle" gutter={8} className={styles.myDrawerHeaderBtnGroup}>
            <Col>
              <Button
                icon={<EditOutlined color="#434343" />}
                className={styles.btnItem}
                onClick={() => {
                  setOpenUpdateUserForm(true);
                }}
              >
                <span className={styles.btnGroupTitle}>Chỉnh sửa</span>
              </Button>
            </Col>
            <Col>
              <Tooltip
                placement="left"
                title={userInfo.status === 'INACTIVE' ? 'Unblock user' : 'Block user'}
              >
                <Button
                  className={styles.btnItem}
                  onClick={handleBlockUserClick}
                  loading={isLoadingBlockUserButton}
                >
                  {userInfo.status === 'INACTIVE' ? <UnlockOutlined /> : <LockOutlined />}
                </Button>
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Updater User Form */}
      <UpdateUserForm
        userInfo={userInfo}
        isVisibleUpdateUser={openUpdateUserForm}
        setIsVisibleUpdateUser={setOpenUpdateUserForm}
        actionRef={actionRef}
        onCloseDrawer={onCloseDrawer}
      />
      {/* Modal Confirm Block User */}
      <Modal
        footer={null}
        centered
        closable={false}
        visible={openBlockUserConfirm}
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
                  style={{
                    fontSize: '16px',
                    color: 'rgba(0, 0, 0, 0.45)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setOpenBlockUserConfirm(false)}
                />
              </Row>
              <Row>
                <span className={styles.lockModalDesc}>
                  Bạn có chắc chắn muốn tạm khóa{' '}
                  <strong>{`${userInfo.staffId} - ${userInfo.name}`}</strong>?
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
              onClick={() => setOpenBlockUserConfirm(false)}
            >
              Huỷ bỏ
            </Button>
            <Button className={styles.submitLockModalButton} size="large" onClick={handleBlockUser}>
              Xác nhận
            </Button>
          </Row>
        </Col>
      </Modal>
    </>
  );
};

export default Header;
