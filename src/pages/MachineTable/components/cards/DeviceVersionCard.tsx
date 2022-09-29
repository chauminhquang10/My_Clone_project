import { SyncOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { FormattedMessage, history } from 'umi';

export interface DeviceVersionCardProps extends API.StmDetailResponse {
  className?: string;
  btnClassName?: string;
}

export default function DeviceVersionCard({
  btnClassName,
  className,
  currentVersion,
  latestVersion,
}: DeviceVersionCardProps) {
  return (
    <Card
      title={<FormattedMessage id="machine-drawer.machine-version" />}
      size="small"
      className={className}
      style={{ borderRadius: 12 }}
    >
      <Row gutter={24} align="bottom">
        <Col span={8}>
          <Form.Item
            name="Tên phiên bản"
            label={<FormattedMessage id="machine-drawer.version-name" />}
          >
            <Input disabled placeholder={currentVersion?.name} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="Phiên bản mới"
            label={<FormattedMessage id="machine-drawer.new-version" />}
          >
            <Input.Search
              disabled
              placeholder={latestVersion?.name}
              enterButton={<SyncOutlined />}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="phoneNumber" label="">
            <Button
              className={btnClassName}
              block
              onClick={() => {
                history.push('/machine/update-firmware');
              }}
            >
              <FormattedMessage id="machine-drawer.version-list-detail" />
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
}
