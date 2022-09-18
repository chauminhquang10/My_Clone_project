import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import { ModalForm } from '@ant-design/pro-components';
import { Button, Col, Form, Input, Row } from 'antd';
import { EditableTable } from '../tables/EditableTable';
import styles from './editMachine.less';

interface DeclareMachineSeriesFormProps {
  width: string;
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
  onFinish: (values: Partial<API.RuleListItem>) => Promise<boolean>;
}

export default function DeclareMachineSeriesForm({
  width,
  visible,
  onVisibleChange,
  onFinish,
}: DeclareMachineSeriesFormProps) {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    onVisibleChange(false);
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
          <p className={styles.modalTitle}>Tạo mới dòng máy</p>
        </Col>
        <Col>
          <span onClick={onReset} className={styles.closeIcon}>
            <img src={closeIcon} />
          </span>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Form.Item name="unitId" label="Loại máy">
            <Input placeholder={'Loại máy'} disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="area" label="Tên dòng máy">
            <Input placeholder={'Loại máy'} disabled />
          </Form.Item>
        </Col>
        <Col span={24}>
          <EditableTable />
        </Col>
      </Row>

      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button className={styles.cancelButton} size="large" onClick={onReset}>
          Huỷ bỏ
        </Button>
        <Button className={styles.submitButton} size="large" htmlType="submit">
          Tiếp tục
        </Button>
      </Row>
    </ModalForm>
  );
}
