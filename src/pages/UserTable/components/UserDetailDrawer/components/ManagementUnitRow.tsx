import { Card, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'umi';
import styles from '../UserDetailDrawer.less';

const ManagementUnitRow: React.FC<API.ManagementUnitResponse> = ({ code, name, address }) => {
  return (
    <Col span={24}>
      <Card
        title={useIntl().formatMessage({ id: 'managementUnit_tableTitle' })}
        size="small"
        className={styles.myCard}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="unitName"
              label={useIntl().formatMessage({ id: 'detailDrawer_infoCard_unitCodeName' })}
            >
              <Input disabled placeholder={`${code} - ${name}`} />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              name="address"
              label={useIntl().formatMessage({ id: 'detailDrawer_infoCard_unitAddress' })}
            >
              <Input disabled placeholder={address} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ManagementUnitRow;
