import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import { getLogs } from '@/services/STM-APIs/LogController';
import { openNotification } from '@/utils';
import { ModalForm } from '@ant-design/pro-components';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import styles from './DownloadLogForm.less';

type CreateFormProps = {
  title: string;
  width: string;
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
  machine?: API.StmInfoResponse;
};

const DownloadLogForm: React.FC<CreateFormProps> = ({
  title,
  width,
  visible,
  onVisibleChange,
  machine,
}) => {
  const [form] = Form.useForm<API.StmInfoResponse & { date: string }>();

  const onReset = () => {
    form.resetFields();
    onVisibleChange(false);
  };

  const handleSubmit = async (values: API.StmInfoResponse & { date: string }) => {
    console.log('values: ', values);

    openNotification('warning', 'Feature is coming soon');
    onVisibleChange(false);
    return;

    if (!machine?.id) {
      openNotification('error', 'Download log failed');
      return;
    }

    try {
      const success = await getLogs({
        machineId: machine.id as string,
        date: '',
      });
      return success;
    } catch (error) {
      console.log('error: ', error);
    }
    return false;
  };

  return (
    <ModalForm
      form={form}
      width={width}
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={handleSubmit}
      modalProps={{
        centered: true,
        closable: false,
        destroyOnClose: true,
        className: styles.myModalForm,
      }}
      submitTimeout={2000}
      onInit={() => {
        form.setFieldsValue({
          name: machine?.name ? machine.name : '',
          terminalId: machine?.terminalId ? machine.terminalId : '',
          ipAddress: machine?.ipAddress ? machine.ipAddress : '',
          date: '',
        });
      }}
    >
      {/* Header */}
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>
          <p className={styles.modalTitle}>{title}</p>
        </Col>
        <Col>
          <span onClick={onReset} className={styles.closeIcon}>
            <img src={closeIcon} alt="close-icon" />
          </span>
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col span={12}>
          <Form.Item name="name" label="Tên máy">
            <Input placeholder={'Nhập tên máy'} disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="terminalId" label="ID máy">
            <Input placeholder={'Nhập ID máy'} disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="ipAddress" label="IP máy">
            <Input placeholder={'Nhập địa chỉ IP'} disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="date"
            label="Ngày hoạt động"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn ngày hoạt động',
              },
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button className={styles.submitButton} size="large" htmlType="submit">
          Tải xuống
        </Button>
      </Row>
    </ModalForm>
  );
};

export default DownloadLogForm;
