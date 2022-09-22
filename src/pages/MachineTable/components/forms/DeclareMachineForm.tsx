import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import { ModalForm } from '@ant-design/pro-components';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import styles from './declareMachineForm.less';
const { Option } = Select;

interface DeclareMachineFormProps extends API.StmDetailResponse {
  width: string;
  visible: boolean;
  onVisibleChange?: (value: boolean) => void;
  onFinish?: (values: Partial<API.RuleListItem>) => Promise<boolean>;
  onOk: () => void;
  onCancel: () => void;
}

export default function DeclareMachineForm({
  width,
  visible,
  onVisibleChange,
  onFinish,
  onCancel,
  onOk,
}: DeclareMachineFormProps) {
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
          <p className={styles.modalTitle}>Khai báo thiết bị</p>
        </Col>
        <Col>
          <span onClick={onReset} className={styles.closeIcon}>
            <img src={closeIcon} />
          </span>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Form.Item name="unitId" label="Số thứ tự">
            <Input placeholder={'Số thứ tự'} disabled />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="area" label="Loại máy">
            <Select placeholder="Loại máy">
              <Option value="private">Private</Option>
              <Option value="public">Public</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="area" label="Dòng máy">
            <Select placeholder="Dòng máy">
              <Option value="private">Private</Option>
              <Option value="public">Public</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="city" label="Series máy">
            <Input placeholder="Series máy" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="district" label="Loại khoá">
            <Select placeholder="Loại khoá">
              <Option value="private">Private</Option>
              <Option value="public">Public</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="subDistrict" label="Terminal ID">
            <Input placeholder="Terminal ID" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="address" label="Địa chỉ IP">
            <Input placeholder="Địa chỉ IP" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="address" label="Acquirer ID">
            <Input placeholder={'Acquirer ID'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="address" label="Cổng">
            <Input placeholder={'Cổng'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="address" label="Master (A)/(B) Key">
            <Input placeholder={'Master (A)/(B) Key'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="address" label="Protocol">
            <Select placeholder="Loại khoá">
              <Option value="private">Private</Option>
              <Option value="public">Public</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="address" label="Tên đường, số nhà">
            <Input placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="city" label="MAC">
            <Input placeholder="MAC" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="district" label="Quận/Huyện">
            <Select placeholder="Chọn Quận/Huyện">
              <Option value="private">Private</Option>
              <Option value="public">Public</Option>
            </Select>
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

      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button
          className={styles.cancelButton}
          size="large"
          onClick={() => {
            onReset();
            onCancel();
          }}
        >
          Huỷ bỏ
        </Button>
        <Button className={styles.submitButton} size="large" htmlType="submit" onClick={onOk}>
          Tiếp tục
        </Button>
      </Row>
    </ModalForm>
  );
}
