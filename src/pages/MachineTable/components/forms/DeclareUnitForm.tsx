import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import { ModalForm } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Row, Table, Typography } from 'antd';
import { data, informationColumns } from '../../data';
import styles from './editMachine.less';

interface DeclareUnitFormProps {
  width: string;
  visible: boolean;
  onVisibleChange?: (value: boolean) => void;
  onFinish?: (values: Partial<API.RuleListItem>) => Promise<boolean>;
}

export default function DeclareUnitForm({
  width,
  visible,
  onVisibleChange,
  onFinish,
}: DeclareUnitFormProps) {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    if (onVisibleChange) onVisibleChange(false);
  };

  return (
    <ModalForm
      form={form}
      width={width}
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={onFinish}
      modalProps={{
        centered: true,
        closable: false,
        destroyOnClose: true,
        className: styles.myModalForm,
      }}
      submitTimeout={2000}
    >
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>
          <p className={styles.modalTitle}>Khai báo đơn vị quản lý</p>
        </Col>
        <Col>
          <span onClick={onReset} className={styles.closeIcon}>
            <img src={closeIcon} />
          </span>
        </Col>
      </Row>

      <Form layout="vertical" className={styles.drawerBody}>
        <Card
          title="Đơn vị quản lý"
          size="small"
          className={styles.myCard}
          style={{ borderRadius: 12 }}
        >
          <Row gutter={24} align="bottom">
            <Col span={12}>
              <Form.Item name="Mã - Tên đơn vị" label="Mã - Tên đơn vị">
                <Input disabled placeholder={'Mã - Tên đơn vị'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Seri máy" label="Địa chỉ đơn vị">
                <Input disabled placeholder={'Địa chỉ đơn vị'} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Loại khoá" label="Mã - Tên nhân viên quản lý">
                <Input disabled placeholder={'example'} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Cổng" label="Danh sách nhân viên quản lý">
                <Table columns={informationColumns} dataSource={data} pagination={false} bordered />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Địa chỉ máy" size="small" style={{ borderRadius: 12, marginTop: 24 }}>
          <Row gutter={[24, 24]} align="bottom">
            <Col span={12}>
              <Form.Item name="Mã - Tên đơn vị" label="Khu vực">
                <Input disabled placeholder={'Khu vực'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Seri máy" label="Tỉnh/ Thành phố">
                <Input disabled placeholder={'Tỉnh/ Thành phố'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Loại khoá" label="Quận/ Huyện">
                <Input disabled placeholder={'Quận/ Huyện'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Loại khoá" label="Phường/ Xã">
                <Input disabled placeholder={'Phường/ Xã'} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Loại khoá" label="Tên đường, Số nhà">
                <Input disabled placeholder={'Tên đường, Số nhà'} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Loại khoá" label="Tên máy">
                <Input disabled placeholder={'Tên máy'} />
                <Typography.Text disabled>
                  Tên máy là duy nhất, không chứa ký tự đặc biệt, tối đa 50 ký tự
                </Typography.Text>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button className={styles.cancelButton} size="large" onClick={onReset}>
          Quay lại
        </Button>
        <Button className={styles.submitButton} size="large" htmlType="submit">
          Hoàn tất
        </Button>
      </Row>
    </ModalForm>
  );
}
