import Api from '@/services/STM-APIs';
import { openNotification } from '@/utils';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import {
  Header,
  MachineListRow,
  ManagementUnitRow,
  RoleGroupRow,
  UserInfoRow,
  UserStatusRow,
} from './components';
import HistoryRow from './components/HistoryRow';
import styles from './UserDetailDrawer.less';

type UserRole = {
  roleName: string;
  roleDetails: string[];
};

type UserDrawerProps = {
  showDetail: boolean;
  setShowDetail: (value: boolean) => void;
  currentRow: API.UserResponse | undefined;
  setCurrentRow: (value: API.UserResponse | undefined) => void;
  roles?: UserRole[];
  children?: React.ReactNode;
};

const UserDetailDrawer: React.FC<UserDrawerProps> = ({
  showDetail,
  setShowDetail,
  currentRow,
  setCurrentRow,
}) => {
  const [userInfo, setUserInfo] = useState<API.UserDetailResponse>({});

  const { run: runDetailUser } = useRequest(
    (params: API.getUserParams) => Api.UserController.getUser(params),
    {
      manual: true,
      onSuccess: (res) => {
        if (!res) {
          openNotification('error', 'Đã xảy ra lỗi', 'Vui lòng thử lại sau');
          return;
        }
        return res;
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  useEffect(() => {
    const getDetailUser = async () => {
      if (currentRow?.id) {
        const res = await runDetailUser({ userId: currentRow.id });

        console.log('user detail res: ', res);

        setUserInfo(res || {});
      }
    };

    getDetailUser();
  }, [currentRow, currentRow?.id, runDetailUser]);

  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

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
            {/* Header */}
            <Header setOpenConfirmModal={setOpenConfirmModal} userInfo={userInfo} />
            {/* Trang thai nguoi dung */}
            <UserStatusRow avatar={userInfo.avatar} status={userInfo.status} />
            <Row gutter={[0, 24]}>
              {/* Thong tin nguoi dung */}
              <UserInfoRow
                staffId={userInfo.staffId}
                name={userInfo.name}
                phoneNumber={userInfo.phoneNumber}
                email={userInfo.email}
              />
              {/* Don vi quan ly */}
              <ManagementUnitRow
                code={userInfo.managementUnit?.code}
                name={userInfo.managementUnit?.name}
                address={userInfo.managementUnit?.address}
              />
              {/* Nhom quyen so huu */}
              <RoleGroupRow {...userInfo.roleGroup} />
              {/* Danh sach may quan ly */}
              <MachineListRow machines={userInfo.machines} />
              {/* Lich su */}
              <HistoryRow />
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
    </>
  );
};

export default UserDetailDrawer;
