import { CloseIcon } from '@/assets';
import { Button, Card, Col, Form, Input, Row, Select, Table, Typography } from 'antd';
import { Store } from 'sunflower-antd';
import { data, informationColumns } from '../../data';
import styles from './editMachine.less';

interface DeclareUnitStepProps {
  onCancel: () => void;
  submit: (values?: Store | undefined) => Promise<unknown>;
  onPrevious: () => void;
}

export default function DeclareUnitStep({ onCancel, submit, onPrevious }: DeclareUnitStepProps) {
  return (
    <>
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>
          <p className={styles.modalTitle}>Khai báo đơn vị quản lý</p>
        </Col>
        <Col>
          <span className={styles.closeIcon} onClick={onCancel}>
            <img src={CloseIcon} />
          </span>
        </Col>
      </Row>

      <Card
        title="Đơn vị quản lý"
        size="small"
        className={styles.myCard}
        style={{ borderRadius: 12 }}
      >
        <Row gutter={24} align="bottom">
          <Col span={12}>
            <Form.Item name="managementUnitId" label="Mã - Tên đơn vị">
              <Select placeholder="Mã - Tên đơn vị"></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="Seri máy" label="Địa chỉ đơn vị">
              <Input disabled placeholder={'Địa chỉ đơn vị'} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="userIds" label="Mã - Tên nhân viên quản lý">
              <Select placeholder="Mã - Tên nhân viên quản lý"></Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Danh sách nhân viên quản lý">
              <Table columns={informationColumns} dataSource={data} pagination={false} bordered />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title="Địa chỉ máy" size="small" style={{ borderRadius: 12, marginTop: 24 }}>
        <Row gutter={[24, 24]} align="bottom">
          <Col span={12}>
            <Form.Item name="location" label="Khu vực">
              <Input placeholder={'Khu vực'} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="provinceId" label="Tỉnh/ Thành phố">
              <Input placeholder={'Tỉnh/ Thành phố'} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="districtId" label="Quận/ Huyện">
              <Input placeholder={'Quận/ Huyện'} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="wardId" label="Phường/ Xã">
              <Input placeholder={'Phường/ Xã'} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="adress" label="Tên đường, Số nhà">
              <Input placeholder={'Tên đường, Số nhà'} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="machineName" label="Tên máy">
              <Input placeholder={'Tên máy'} />
              <Typography.Text disabled>
                Tên máy là duy nhất, không chứa ký tự đặc biệt, tối đa 50 ký tự
              </Typography.Text>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button
          className={styles.cancelButton}
          size="large"
          onClick={() => {
            // onReset();
            onPrevious();
          }}
        >
          Quay lại
        </Button>
        <Button
          className={styles.submitButton}
          size="large"
          onClick={() => {
            submit().then((result) => {
              if (result === 'ok') console.log('Form submitted');
            });
          }}
        >
          Hoàn tất
        </Button>
      </Row>
    </>
  );
}
