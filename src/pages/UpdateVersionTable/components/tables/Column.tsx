import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties//TableCell';
import { DatePicker, Space } from 'antd';
import { formatDate } from '@/utils';

const { RangePicker } = DatePicker;

type ColumnProps = {
  setCurrentRow: (s: API.VersionResponse) => void;
  setShowDetail: (s: boolean) => void;
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

function Column({}: ColumnProps) {
  const columns: ProColumns<API.VersionResponse>[] = [
    {
      title: <HeadCell>Tên phiên bản</HeadCell>,
      dataIndex: 'name',
      render: (dom) => {
        const stt = dom as number;
        return <TextCell>{stt}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.name && b.name) return a.name.localeCompare(b.name);
        else return 1;
      },
    },
    {
      title: <HeadCell>Loại máy</HeadCell>,
      dataIndex: 'machineType',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.machineType && b.machineType) return a.machineType.localeCompare(b.machineType);
        else return 1;
      },
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
        return <TextCell>{dom}</TextCell>;
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
      filterDropdown: (
        <Space>
          <RangePicker
            allowClear={true}
            onCalendarChange={(_, dateStrings) => {
              console.log(
                new Date(dateStrings[0]).toDateString(),
                new Date(dateStrings[1]).toDateString(),
              );
            }}
          />
        </Space>
      ),
    },
  ];
  return columns;
}

export default Column;
