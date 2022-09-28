import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { FormattedMessage, useModel } from 'umi';
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
  const { initialState } = useModel('@@initialState');

  return (
    <Card
      title={<FormattedMessage id="machine-drawer.device-information" />}
      extra={
        <Button
          disabled={initialState?.currentRoles?.update_machine !== true}
          type="link"
          icon={<EditOutlined />}
          onClick={onExtraClick}
        >
          <span>
            <FormattedMessage id="edit" />
          </span>
        </Button>
      }
      size="small"
      className={className}
      style={{ borderRadius: 12 }}
    >
      <Row gutter={24} align="bottom">
        <Col span={6}>
          <Form.Item name="Dòng máy" label={<FormattedMessage id="machineType" />}>
            <Input disabled placeholder={model?.name} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="Seri máy" label={<FormattedMessage id="declare-machine.series" />}>
            <Input disabled placeholder={serialNumber} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="Loại khoá" label={<FormattedMessage id="declare-machine.keyType" />}>
            <Input disabled placeholder={keyType} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="Cổng" label={<FormattedMessage id="declare-machine.port" />}>
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
          <Form.Item
            name="Tài khoản hạch toán USD"
            label={<FormattedMessage id="declare-machine.accountingUSD" />}
          >
            <Input disabled placeholder={accountingAccountUSD} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="Tài khoản hạch toán VNĐ"
            label={<FormattedMessage id="declare-machine.accountingVND" />}
          >
            <Input disabled placeholder={accountingAccountVND} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="Quy tắc chi tiền"
            label={<FormattedMessage id="declare-machine.denominationRule" />}
          >
            <Input disabled placeholder={denominationRule} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="Loại mệnh giá tiền"
            label={<FormattedMessage id="declare-machine.denominations" />}
          >
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
