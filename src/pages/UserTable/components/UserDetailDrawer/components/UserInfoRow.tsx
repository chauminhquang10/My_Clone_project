import { Card, Col, Form, Input, Row } from 'antd';
import React from 'react';
import styles from '../UserDetailDrawer.less';

type UserInfoRowProps = Pick<API.UserDetailResponse, 'name' | 'phoneNumber' | 'email' | 'staffId'>;

const UserInfoRow: React.FC<UserInfoRowProps> = ({ staffId, name, phoneNumber, email }) => {
  return (
    <Col span={24}>
      <Card title="Thông tin người dùng" size="small" className={styles.myCard}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="staffName" label="Mã - Tên nhân viên quản lý">
              <Input disabled placeholder={`${staffId} - ${name}`} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="phoneNumber" label="Số điện thoại">
              <Input disabled placeholder={phoneNumber} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="email" label="Email">
              <Input disabled placeholder={email} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default UserInfoRow;
