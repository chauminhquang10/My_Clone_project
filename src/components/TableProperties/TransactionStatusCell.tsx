import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  QuestionCircleFilled,
} from '@ant-design/icons';
import { green, red, blue, yellow } from '@ant-design/colors';
import { Space } from 'antd';

type IconStatusProps = {
  type: 'UNKNOWN' | 'SUCCESS' | 'FAIL' | 'PROCESSING' | 'NEXT';
};

function IconStatus({ type }: IconStatusProps) {
  switch (type) {
    case 'SUCCESS':
      return <CheckCircleFilled style={{ color: green[6] }} />;
    case 'FAIL':
      return <CloseCircleFilled style={{ color: red[6] }} />;
    case 'PROCESSING':
      return <ClockCircleFilled style={{ color: blue[6] }} />;
    case 'NEXT':
      return <CheckCircleFilled style={{ color: green[6] }} />;
    default:
      return <QuestionCircleFilled style={{ color: yellow[6] }} />;
  }
}

type TransactionStatusCellProps = {
  status: 'UNKNOWN' | 'SUCCESS' | 'FAIL' | 'PROCESSING' | 'NEXT';
};

function TransactionStatusCell({ status }: TransactionStatusCellProps) {
  const listStatus = {
    UNKNOWN: 'Không xác định',
    SUCCESS: 'Thành công',
    FAIL: 'Thất bại',
    PROCESSING: 'Đang xử lý',
    NEXT: 'Bước tiếp theo',
  };
  return (
    <Space size={10}>
      <IconStatus type={status} />
      {listStatus[status]}
    </Space>
  );
}

export default TransactionStatusCell;
