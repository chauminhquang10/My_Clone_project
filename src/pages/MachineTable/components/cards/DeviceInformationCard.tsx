import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { UnitCardProps } from './UnitCard';

export default function DeviceInformationCard({ onExtraClick, className }: UnitCardProps) {
  return (
    <Card
      title="Thông tin thiết bị"
      extra={
        <Button type="link" icon={<EditOutlined />} onClick={onExtraClick}>
          Chỉnh sửa
        </Button>
      }
      size="small"
      className={className}
      style={{ borderRadius: 12 }}
    >
      <Row gutter={24} align="bottom">
        <Col span={6}>
          <Form.Item name="Dòng máy" label="Dòng máy">
            <Input disabled placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="Seri máy" label="Seri máy">
            <Input disabled placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="Loại khoá" label="Loại khoá">
            <Input disabled placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="Cổng" label="Cổng">
            <Input disabled placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="Protocol" label="Protocol">
            <Input disabled placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="Master (A)/(B) Key" label="Master (A)/(B) Key">
            <Input disabled placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="MAC" label="MAC">
            <Input disabled placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="Tài khoản hạch toán USD" label="Tài khoản hạch toán USD">
            <Input disabled placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="Tài khoản hạch toán VNĐ" label="Tài khoản hạch toán VNĐ">
            <Input disabled placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="Quy tắc chi tiền" label="Quy tắc chi tiền">
            <Input disabled placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="Loại mệnh giá tiền" label="Loại mệnh giá tiền">
            <Row gutter={12}>
              <Col span={6}>
                <Input disabled placeholder={'500'} />
              </Col>
              <Col span={6}>
                <Input disabled placeholder={'200'} />
              </Col>
              <Col span={6}>
                <Input disabled placeholder={'100'} />
              </Col>
              <Col span={6}>
                <Input disabled placeholder={'50'} />
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
}
