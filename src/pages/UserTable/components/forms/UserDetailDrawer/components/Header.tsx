import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Row, Tooltip } from 'antd';
import React, { useState } from 'react';
import UpdateUserForm from '../../UpdateUserForm';
import styles from '../UserDetailDrawer.less';
import lockIcon from '/src/assets/images/svg/icon/Locked.svg';

interface HeaderProps {
  setOpenConfirmModal: (isVisible: boolean) => void;
  userInfo: API.UserDetailResponse;
}

const Header: React.FC<HeaderProps> = ({ setOpenConfirmModal, userInfo }) => {
  const [isVisibleUpdateUser, setIsVisibleUpdateUser] = useState<boolean>(false);

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
                  setIsVisibleUpdateUser(true);
                }}
              >
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

      <UpdateUserForm
        userInfo={userInfo}
        isVisibleUpdateUser={isVisibleUpdateUser}
        setIsVisibleUpdateUser={setIsVisibleUpdateUser}
      />
    </>
  );
};

export default Header;
