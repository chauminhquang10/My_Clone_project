import { TextCell } from '@/components/TableProperties//TableCell';
import HeadCell from '@/components/TableProperties/HeadCell';
import type { ProColumns } from '@ant-design/pro-components';
import { Typography } from 'antd';
import { FormattedMessage } from 'umi';

type filterType = {
  text: string;
  value: string;
}[];

const filterTypeMachineList: filterType = [
  {
    text: 'ATM',
    value: 'ATM',
  },
  {
    text: 'CDM',
    value: 'CDM',
  },
  {
    text: 'UNKNOWN',
    value: 'UNKNOWN',
  },
  {
    text: 'STM',
    value: 'STM',
  },
];

const filterTypeMachine = (value: string | number | boolean, record: API.StmInfoResponse) => {
  return record.machineType?.includes(value as string) ? true : false;
};

interface ColumnProps {
  setOpenLogForm: (open: boolean) => void;
  setCurrentRow: (r: API.StmInfoResponse) => void;
  setParamFilter: React.Dispatch<React.SetStateAction<API.getListModelsParams | undefined>>;
  paramFilter: API.getListModelsParams | undefined;
}

function Column({ setOpenLogForm, setCurrentRow }: ColumnProps) {
  const columns: ProColumns<API.StmInfoResponse>[] = [
    {
      title: (
        <HeadCell>
          <FormattedMessage id="userList.tables.headCell.index" />
        </HeadCell>
      ),
      dataIndex: 'index',
      render: (_, __, index) => {
        return <TextCell>{index + 1}</TextCell>;
      },
      width: '80px',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="machineType" />
        </HeadCell>
      ),
      dataIndex: 'machineType',
      render: (dom) => {
        return (
          <TextCell width="100%">
            <Typography.Text ellipsis={{ tooltip: dom }}>{dom}</Typography.Text>
          </TextCell>
        );
      },
      filters: filterTypeMachineList,
      onFilter: filterTypeMachine,
      width: '140px',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="machineName" />
        </HeadCell>
      ),
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <TextCell
            position="left"
            width="450px"
            onClick={() => {
              setOpenLogForm(true);
              setCurrentRow(entity);
            }}
          >
            {dom}
          </TextCell>
        );
      },
      sorter: (a, b) => {
        if (a.name && b.name) return a.name.localeCompare(b.name);
        else return 1;
      },
    },

    {
      title: (
        <HeadCell>
          <FormattedMessage id="terminalId" />
        </HeadCell>
      ),
      dataIndex: 'terminalId',
      render: (dom) => {
        return (
          <TextCell width="450px">
            <Typography.Text ellipsis={{ tooltip: dom }}>{dom}</Typography.Text>
          </TextCell>
        );
      },
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="ipAddress" />
        </HeadCell>
      ),
      dataIndex: 'ipAddress',
      render: (dom) => {
        return (
          <TextCell width="450px">
            <Typography.Text ellipsis={{ tooltip: dom }}>{dom}</Typography.Text>
          </TextCell>
        );
      },
    },
  ];
  return columns;
}

export default Column;
