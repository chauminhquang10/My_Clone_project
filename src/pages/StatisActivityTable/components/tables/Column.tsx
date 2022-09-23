import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties//TableCell';

type ColumnProps = {
  setCurrentRow: (s: API.StmInfoResponse) => void;
  setShowDetail: (s: boolean) => void;
};

function Column({ setCurrentRow, setShowDetail }: ColumnProps) {
  const columns: ProColumns<API.TransactionConfigurationResponse>[] = [
    {
      title: <HeadCell>Tên máy</HeadCell>,
      dataIndex: 'machine',
      render: (_, entity) => {
        const handleClick = () => {
          setShowDetail(true);
          setCurrentRow(entity.machine as API.StmInfoResponse);
        };

        return <TextCell onClick={handleClick}>{entity.machine?.name}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.machine?.name && b.machine?.name) return a.machine.name.localeCompare(b.machine.name);
        else return 1;
      },
      width: '200px',
    },
    {
      title: <HeadCell>Terminal ID</HeadCell>,
      dataIndex: 'machine',
      render: (_, entity) => {
        return <TextCell>{entity.machine?.terminalId}</TextCell>;
      },
    },
    {
      title: <HeadCell>IP Address</HeadCell>,
      dataIndex: 'machine',
      render: (_, entity) => {
        return <TextCell>{entity.machine?.ipAddress}</TextCell>;
      },
    },
    {
      title: <HeadCell>Tổng giao dịch</HeadCell>,
      dataIndex: 'total',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.total && b.total) return a.total - b.total;
        return 1;
      },
    },
    {
      title: <HeadCell>Thành công</HeadCell>,
      dataIndex: 'success',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.success && b.success) return a.success - b.success;
        return 1;
      },
    },
    {
      title: <HeadCell>Thất bại</HeadCell>,
      dataIndex: 'failure',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.failure && b.failure) return a.failure - b.failure;
        return 1;
      },
    },
  ];
  return columns;
}

export default Column;
