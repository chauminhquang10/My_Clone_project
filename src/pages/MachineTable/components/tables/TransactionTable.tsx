import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import { ModalForm } from '@ant-design/pro-components';
import { Col, Form, Row, Table } from 'antd';
import { data, transactionColumns } from '../../data';
import styles from './editMachine.less';

interface TransactionTableProps {
  width: string;
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
  onFinish: (values: Partial<API.RuleListItem>) => Promise<boolean>;
}

export default function TransactionTable({
  width,
  visible,
  onVisibleChange,
  onFinish,
}: TransactionTableProps) {
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
          <p className={styles.modalTitle}>Chi tiết giao dịch</p>
        </Col>
        <Col>
          <span onClick={onReset} className={styles.closeIcon}>
            <img src={closeIcon} />
          </span>
        </Col>
      </Row>
      <Table columns={transactionColumns} dataSource={data} pagination={false} bordered />
    </ModalForm>
  );
}
