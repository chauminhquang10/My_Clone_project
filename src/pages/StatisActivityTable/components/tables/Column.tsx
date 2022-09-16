import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties//TableCell';

type ColumnProps = {
  setCurrentRow: (s: API.StmInfoResponse) => void;
  setShowDetail: (s: boolean) => void;
};

type TransactionConfiguration = {
  machine: API.StmInfoResponse;
  total: number;
  success: number;
  failure: number;
};

function Column({}: ColumnProps) {
  const columns: ProColumns<TransactionConfiguration>[] = [
    {
      title: <HeadCell>Tên máy</HeadCell>,
      dataIndex: 'machine',
      render: (_, entity) => {
        return <TextCell>{entity.machine.name}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.machine.name && b.machine.name) return a.machine.name.localeCompare(b.machine.name);
        else return 1;
      },
    },
    {
      title: <HeadCell>Terminal ID</HeadCell>,
      dataIndex: 'machine',
      render: (_, entity) => {
        return <TextCell>{entity.machine.terminalId}</TextCell>;
      },
    },
    {
      title: <HeadCell>IP Address</HeadCell>,
      dataIndex: 'machine',
      render: (_, entity) => {
        return <TextCell>{entity.machine.ipAddress}</TextCell>;
      },
    },
    {
      title: <HeadCell>Tổng giao dịch</HeadCell>,
      dataIndex: 'total',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      sorter: (a, b) => {
        return a.total - b.total;
      },
    },
    {
      title: <HeadCell>Thành công</HeadCell>,
      dataIndex: 'success',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      sorter: (a, b) => {
        return a.success - b.success;
      },
    },
    {
      title: <HeadCell>Thất bại</HeadCell>,
      dataIndex: 'failure',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      sorter: (a, b) => {
        return a.success - b.success;
      },
    },
  ];
  return columns;
}

export default Column;
