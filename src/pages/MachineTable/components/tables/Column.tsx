import MachineStatusTag from '@/components/Common/MachineStatusTag';
import { TextCell } from '@/components/TableProperties//TableCell';
import HeadCell from '@/components/TableProperties/HeadCell';
import type { ProColumns } from '@ant-design/pro-components';

type ColumnProps = {
  setCurrentRow: (s: API.StmInfoResponse) => void;
  setShowDetail: (s: boolean) => void;
};

type filterType = {
  text: string;
  value: string;
}[];

//------------ Filter Location --------------------------------

const filterLocationList: filterType = [
  {
    text: 'Miền Bắc',
    value: 'Miền Bắc',
  },
  {
    text: 'Miền Trung',
    value: 'Miền Trung',
  },
  {
    text: 'Miền Nam',
    value: 'Miền Nam',
  },
];

const filterLocation = (value: string | number | boolean, record: API.StmInfoResponse) => {
  return record.location?.includes(value as string) ? true : false;
};

//------------ Filter Province --------------------------------

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

//------------ Filter Status Machine --------------------------------

const filterStatusList: filterType = [
  {
    text: 'IN SERVICE',
    value: 'IN SERVICE',
  },
  {
    text: 'OUT OF SERVICE',
    value: 'OUT OF SERVICE',
  },
  {
    text: 'UNKNOWN',
    value: 'UNKNOWN',
  },
  {
    text: 'OFFLINE',
    value: 'OFFLINE',
  },
];

const filterStatus = (value: string | number | boolean, record: API.StmInfoResponse) => {
  return record.status?.includes(value as string) as boolean;
};

function Column({ setShowDetail, setCurrentRow }: ColumnProps) {
  const columns: ProColumns<API.StmInfoResponse>[] = [
    {
      title: <HeadCell>STT</HeadCell>,
      dataIndex: 'id',
      render: (_, data, index) => {
        const stt = index + 1;

        return <TextCell>{stt}</TextCell>;
      },
      width: '80px',
    },
    {
      title: <HeadCell>Tên máy</HeadCell>,
      dataIndex: 'name',
      render: (dom, data) => {
        const handleClick = () => {
          setShowDetail(true);
          setCurrentRow(data);
        };
        return (
          <TextCell width="216px" onClick={handleClick}>
            {dom}
          </TextCell>
        );
      },
      sorter: (a, b) => {
        if (a.name && b.name) return a.name.localeCompare(b.name);
        else return 1;
      },
      width: '216px',
    },
    {
      title: <HeadCell>Khu vực</HeadCell>,
      dataIndex: 'location',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      filters: filterLocationList,
      onFilter: filterLocation,
      width: '140px',
    },
    {
      title: <HeadCell>Tỉnh/ Thành phố</HeadCell>,
      dataIndex: 'province',
      render: (_, entity) => {
        return <TextCell>{entity.province?.name}</TextCell>;
      },
      width: '216px',
    },
    {
      title: <HeadCell>Loại máy</HeadCell>,
      dataIndex: 'machineType',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      filters: filterTypeMachineList,
      onFilter: filterTypeMachine,
      width: '140px',
    },
    {
      title: <HeadCell>Tình trạng</HeadCell>,
      dataIndex: 'status',
      render: (dom) => {
        return dom;
      },
      width: '180px',
      filters: filterStatusList,
      onFilter: filterStatus,
      valueEnum: {
        IN_SERVICE: {
          text: <MachineStatusTag type="IN_SERVICE" />,
        },
        OUT_OF_SERVICE: {
          text: <MachineStatusTag type="OUT_OF_SERVICE" />,
        },
        UNKNOWN: {
          text: <MachineStatusTag type="UNKNOWN" />,
        },
        OFFLINE: {
          text: <MachineStatusTag type="OFFLINE" />,
        },
      },
    },
    {
      title: <HeadCell>Ghi chú tình trạng</HeadCell>,
      dataIndex: 'activity',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      width: '216px',
    },
    {
      title: <HeadCell>Terminal ID</HeadCell>,
      dataIndex: 'terminalId',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      width: '200px',
    },
    {
      title: <HeadCell>Địa chỉ IP</HeadCell>,
      dataIndex: 'ipAddress',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      width: '200px',
    },
  ];
  return columns;
}

export default Column;
