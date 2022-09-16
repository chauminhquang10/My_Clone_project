import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties//TableCell';

type ColumnProps = {
  setCurrentRow: (s: API.StorageItem) => void;
  setShowDetail: (s: boolean) => void;
};

function Column({}: ColumnProps) {
  const columns: ProColumns<API.StorageItem>[] = [
    {
      title: <HeadCell>Loại thiết bị</HeadCell>,
      dataIndex: 'deviceType',
      render: (_, entity) => {
        return <TextCell>{entity.deviceType?.name}</TextCell>;
      },
    },
    {
      title: <HeadCell>Đơn vị tính</HeadCell>,
      dataIndex: 'deviceType',
      render: (_, entity) => {
        return <TextCell>{entity.deviceType?.unit}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.deviceType?.unit && b.deviceType?.unit)
          return a.deviceType.unit.localeCompare(b.deviceType.unit);
        else return 1;
      },
    },
    {
      title: <HeadCell>Sức chứa tối thiểu</HeadCell>,
      dataIndex: 'minCapacity',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.minCapacity && b.minCapacity) return a.minCapacity - b.minCapacity;
        return 1;
      },
    },
  ];
  return columns;
}

export default Column;
