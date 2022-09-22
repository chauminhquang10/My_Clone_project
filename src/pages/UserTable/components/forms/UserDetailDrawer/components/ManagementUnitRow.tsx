import { Card, Col, Form, Input, Row } from 'antd';
import React from 'react';
import styles from '../UserDetailDrawer.less';

const ManagementUnitRow: React.FC<API.ManagementUnitResponse> = ({ code, name, address }) => {
  return (
    <Col span={24}>
      <Card title="Đơn vị quản lý" size="small" className={styles.myCard}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="unitName" label="Mã - Tên đơn vị">
              <Input disabled placeholder={`${code} - ${name}`} />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item name="address" label="Địa chỉ đơn vị">
              <Input disabled placeholder={address} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ManagementUnitRow;
