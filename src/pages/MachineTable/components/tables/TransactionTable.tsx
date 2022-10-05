import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import HeadCell from '@/components/TableProperties/HeadCell';
import { ModalForm } from '@ant-design/pro-components';
import { Col, Form, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import styles from './editMachine.less';
import TransactionStatusCell from '@/components/TableProperties/TransactionStatusCell';

//-------------- Column Transaction ----------

const transactionColumns: ColumnsType<API.TransactionResponse> = [
  {
    title: <HeadCell>Transaction ID</HeadCell>,
    dataIndex: 'id',
    width: '140px',
  },
  {
    title: <HeadCell>Trasaction type</HeadCell>,
    className: 'column-money',
    dataIndex: 'type',
    width: '292px',
  },
  {
    title: <HeadCell>Transaction time</HeadCell>,
    dataIndex: 'time',
    width: '180px',
  },
  {
    title: <HeadCell>Customer ID</HeadCell>,
    dataIndex: 'accountNumber',
    width: '140px',
  },
  {
    title: <HeadCell>Customer name</HeadCell>,
    dataIndex: 'customerName',
    width: '292px',
  },
  {
    title: <HeadCell>Status</HeadCell>,
    dataIndex: 'status',
    width: '180px',
    render: (value, entity) => {
      return <TransactionStatusCell status={entity.status ? entity.status : 'UNKNOWN'} />;
    },
  },
  {
    title: <HeadCell>Error code</HeadCell>,
    dataIndex: 'error',
    width: '140px',
  },
];

interface TransactionTableProps {
  width: string;
  visible: boolean;
  detailTransaction: API.TransactionResponse[] | undefined;
  onVisibleChange: (value: boolean) => void;
  onFinish: (values: Partial<API.RuleListItem>) => Promise<boolean>;
}

export default function TransactionTable({
  width,
  visible,
  onVisibleChange,
  onFinish,
  detailTransaction,
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
          <p className={styles.modalTitle}>Transaction detail</p>
        </Col>
        <Col>
          <span onClick={onReset} className={styles.closeIcon}>
            <img src={closeIcon} />
          </span>
        </Col>
      </Row>
      <Table
        columns={transactionColumns}
        dataSource={detailTransaction}
        pagination={false}
        bordered
      />
    </ModalForm>
  );
}
