import { SyncOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';

export interface DeviceVersionCardProps {
  className?: string;
  btnClassName?: string;
}

export default function DeviceVersionCard({ btnClassName, className }: DeviceVersionCardProps) {
  return (
    <Card
      title="Phiên bản thiết bị"
      size="small"
      className={className}
      style={{ borderRadius: 12 }}
    >
      <Row gutter={24} align="bottom">
        <Col span={8}>
          <Form.Item name="Tên phiên bản" label="Tên phiên bản">
            <Input disabled placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="Phiên bản mới" label="Phiên bản mới">
            <Input.Search disabled placeholder={'example'} enterButton={<SyncOutlined />} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="phoneNumber" label="">
            <Button className={btnClassName} block>
              Xem danh sách phần mềm
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
}
