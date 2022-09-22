import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import type { UnitCardProps } from './UnitCard';

export default function DeviceInformationCard({
  onExtraClick,
  className,
  model,
  serialNumber,
  port,
  keyType,
  protocol,
  masterKey,
  mac,
  accountingAccountVND,
  accountingAccountUSD,
  denominationRule,
  denominations,
}: UnitCardProps & API.StmDetailResponse) {
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
            <Input disabled placeholder={model?.name} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="Seri máy" label="Seri máy">
            <Input disabled placeholder={serialNumber} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="Loại khoá" label="Loại khoá">
            <Input disabled placeholder={keyType} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="Cổng" label="Cổng">
            <Input disabled placeholder={port?.toString()} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="Protocol" label="Protocol">
            <Input disabled placeholder={protocol} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="Master (A)/(B) Key" label="Master (A)/(B) Key">
            <Input disabled placeholder={masterKey} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="MAC" label="MAC">
            <Input disabled placeholder={mac} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="Tài khoản hạch toán USD" label="Tài khoản hạch toán USD">
            <Input disabled placeholder={accountingAccountUSD} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="Tài khoản hạch toán VNĐ" label="Tài khoản hạch toán VNĐ">
            <Input disabled placeholder={accountingAccountVND} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="Quy tắc chi tiền" label="Quy tắc chi tiền">
            <Input disabled placeholder={denominationRule} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="Loại mệnh giá tiền" label="Loại mệnh giá tiền">
            <Row gutter={12}>
              {denominations?.map((item, index) => {
                const key = index + item.toString();
                return (
                  <Col span={6} key={key}>
                    <Input disabled placeholder={item.toString()} />
                  </Col>
                );
              })}
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
}
