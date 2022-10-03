import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties//TableCell';
import type { Dispatch, SetStateAction } from 'react';
import { FormattedMessage } from 'umi';
import { Typography } from 'antd';

type ColumnProps = {
  setCurrentRow: (s: API.StmInfoResponse) => void;
  setShowDetail: (s: boolean) => void;
  setParamFilter: Dispatch<SetStateAction<API.getListMachinesParams | undefined>>;
  paramFilter: API.getListMachinesParams | undefined;
};

function Column({ setCurrentRow, setShowDetail }: ColumnProps) {
  const columns: ProColumns<API.TransactionConfigurationResponse>[] = [
    {
      title: (
        <HeadCell>
          <FormattedMessage id="machineName" />
        </HeadCell>
      ),
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
      width: 'calc(calc(100% - 600px) / 3)',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="terminalId" />
        </HeadCell>
      ),
      dataIndex: 'machine',
      render: (_, entity) => {
        return <TextCell>{entity.machine?.terminalId}</TextCell>;
      },
      width: 'calc(calc(100% - 600px) / 3)',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="ipAddress" />
        </HeadCell>
      ),
      dataIndex: 'machine',
      render: (_, entity) => {
        return (
          <TextCell width="328px">
            <Typography.Text ellipsis={{ tooltip: entity.machine?.ipAddress }}>
              {entity.machine?.ipAddress}
            </Typography.Text>
          </TextCell>
        );
      },
      width: '328px',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="totalAnalytics" />
        </HeadCell>
      ),
      dataIndex: 'total',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.total && b.total) return a.total - b.total;
        return 1;
      },
      width: '200px',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="success" />
        </HeadCell>
      ),
      dataIndex: 'success',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.success && b.success) return a.success - b.success;
        return 1;
      },
      width: '200px',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="fail" />
        </HeadCell>
      ),
      dataIndex: 'failure',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.failure && b.failure) return a.failure - b.failure;
        return 1;
      },
      width: '200px',
    },
  ];
  return columns;
}

export default Column;
