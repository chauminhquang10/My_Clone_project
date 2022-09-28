import { TextCell } from '@/components/TableProperties//TableCell';
import HeadCell from '@/components/TableProperties/HeadCell';
import type { ProColumns } from '@ant-design/pro-components';

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
      title: <HeadCell>STT</HeadCell>,
      dataIndex: 'index',
      render: (_, __, index) => {
        return <TextCell>{index + 1}</TextCell>;
      },
      width: '80px',
    },
    {
      title: <HeadCell>Loại máy</HeadCell>,
      dataIndex: 'machineType',
      render: (dom) => {
        return <TextCell width="100%">{dom}</TextCell>;
      },
      filters: filterTypeMachineList,
      onFilter: filterTypeMachine,
      width: '9%',
    },
    {
      title: <HeadCell>Tên máy</HeadCell>,
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <TextCell
            position="left"
            width="300px"
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
      width: '29%',
    },

    {
      title: <HeadCell>Terminal ID</HeadCell>,
      dataIndex: 'terminalId',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      width: '29%',
    },
    {
      title: <HeadCell>Địa chỉ IP</HeadCell>,
      dataIndex: 'ipAddress',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      width: '29%',
    },
  ];
  return columns;
}

export default Column;
