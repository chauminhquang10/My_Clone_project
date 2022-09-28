import { SyncOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { history } from 'umi';

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
      title="Phiên bản thiết bị"
      size="small"
      className={className}
      style={{ borderRadius: 12 }}
    >
      <Row gutter={24} align="bottom">
        <Col span={8}>
          <Form.Item name="Phiên bản hiện tại" label="Phiên bản hiện tại">
            <Input disabled placeholder={currentVersion?.name} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="Phiên bản mới" label="Phiên bản mới">
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
              Xem danh sách phần mềm
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
}
