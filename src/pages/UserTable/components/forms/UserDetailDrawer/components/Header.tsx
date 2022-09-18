import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Row, Tooltip } from 'antd';
import React, { useState } from 'react';
import UpdateUserForm from '../../UpdateUserForm';
import styles from '../UserDetailDrawer.less';
import lockIcon from '/src/assets/images/svg/icon/Locked.svg';

interface HeaderProps {
  setOpenConfirmModal: (isVisible: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setOpenConfirmModal }) => {
  const [isVisibleModalForm, setIsVisibleModalForm] = useState<boolean>(false);

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
                  setIsVisibleModalForm(true);
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
        title="Chỉnh sửa người dùng"
        width="934px"
        visible={isVisibleModalForm}
        onVisibleChange={setIsVisibleModalForm}
        onFinish={async () => {
          // const success = await handleAdd(value as API.RuleListItem);
          // if (success) {
          //   handleUpdateModalVisible(false);
          //   if (actionRef.current) {
          //     actionRef.current.reload();
          //   }
          //   return true;
          // }
          setIsVisibleModalForm(false);
          return false;
        }}
      />
    </>
  );
};

export default Header;
