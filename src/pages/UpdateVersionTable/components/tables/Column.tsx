import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties//TableCell';
import { formatDate } from '@/utils';
import DateFilter from '@/components/TableProperties/DateFilter';
import type { Dispatch, SetStateAction } from 'react';

type ColumnProps = {
  setCurrentRow: (s: API.VersionResponse) => void;
  setShowDetail: (s: boolean) => void;
  setParamFilter: Dispatch<SetStateAction<API.getAllVersionParams | undefined>>;
  paramFilter: API.getAllVersionParams | undefined;
};
//------------ Filter type --------------------------------

type filterType = {
  text: string;
  value: string;
};

//------------ Filter moodel --------------------------------

const filterModelList: filterType[] = [
  {
    text: '',
    value: '',
  },
];

const filterModel = (value: string | number | boolean, record: API.VersionResponse) => {
  return record.name?.includes(value as string) as boolean;
};

function Column({ setCurrentRow, setShowDetail }: ColumnProps) {
  const columns: ProColumns<API.VersionResponse>[] = [
    {
      title: <HeadCell>Tên phiên bản</HeadCell>,
      dataIndex: 'name',
      render: (dom, entity) => {
        const stt = dom as number;
        return (
          <TextCell
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
            width="240px"
          >
            {stt}
          </TextCell>
        );
      },
      sorter: (a, b) => {
        if (a.name && b.name) return a.name.localeCompare(b.name);
        else return 1;
      },
      width: '240px',
    },
    {
      title: <HeadCell>Loại máy</HeadCell>,
      dataIndex: 'machineType',
      render: (dom) => {
        return <TextCell width="140px">{dom}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.machineType && b.machineType) return a.machineType.localeCompare(b.machineType);
        else return 1;
      },
      width: '140px',
    },
    {
      title: <HeadCell>Dòng máy</HeadCell>,
      dataIndex: 'model',
      render: (_, entity) => {
        return <TextCell>{entity.model?.name}</TextCell>;
      },
      filters: filterModelList,
      onFilter: filterModel,
    },
    {
      title: <HeadCell>Nội dung</HeadCell>,
      dataIndex: 'content',
      render: (dom) => {
        return <TextCell width="570px">{dom}</TextCell>;
      },
    },
    {
      title: <HeadCell>Điều kiện nâng cấp</HeadCell>,
      dataIndex: 'condition',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
    },
    {
      title: <HeadCell>Thời gian tải lên</HeadCell>,
      dataIndex: 'createdAt',
      render: (dom) => {
        return <TextCell>{formatDate(dom as string)}</TextCell>;
      },
      filterDropdown: () => {
        return <DateFilter />;
      },
    },
  ];
  return columns;
}

export default Column;
