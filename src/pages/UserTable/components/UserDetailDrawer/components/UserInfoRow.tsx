import { formatStaffName } from '@/utils';
import { Card, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'umi';
import styles from '../UserDetailDrawer.less';

type UserInfoRowProps = Pick<API.UserDetailResponse, 'name' | 'phoneNumber' | 'email' | 'staffId'>;

const UserInfoRow: React.FC<UserInfoRowProps> = ({ staffId, name, phoneNumber, email }) => {
  return (
    <Col span={24}>
      <Card
        title={useIntl().formatMessage({ id: 'userTable.detail.userInfoRow.title' })}
        size="small"
        className={styles.myCard}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="staffName"
              label={useIntl().formatMessage({ id: 'userTable.detail.userInfoRow.staffName' })}
            >
              <Input disabled placeholder={formatStaffName(staffId, name)} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="phoneNumber"
              label={useIntl().formatMessage({ id: 'userTable.detail.userInfoRow.phoneNumber' })}
            >
              <Input disabled placeholder={phoneNumber} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="email"
              label={useIntl().formatMessage({ id: 'userTable.detail.userInfoRow.email' })}
            >
              <Input disabled placeholder={email} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default UserInfoRow;
