import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties//TableCell';

type ColumnProps = {
  setCurrentRow: (s: API.StmModelResponse) => void;
  setShowDetail: (s: boolean) => void;
};

function Column({ setCurrentRow, setShowDetail }: ColumnProps) {
  const columns: ProColumns<API.StmModelResponse>[] = [
    {
      title: <HeadCell>Loại máy</HeadCell>,
      dataIndex: 'machineType',
      render: (dom, entity) => {
        return (
          <TextCell
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </TextCell>
        );
      },
    },
    {
      title: <HeadCell>Dòng máy</HeadCell>,
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <TextCell
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </TextCell>
        );
      },
    },
    {
      title: <HeadCell>Người tạo</HeadCell>,
      dataIndex: 'createdBy',
      render: (_, entity) => {
        return <TextCell>{`${entity.createdBy?.staffId} - ${entity.createdBy?.name}`}</TextCell>;
      },
    },
    {
      title: <HeadCell>Ngày tạo</HeadCell>,
      dataIndex: 'createdAt',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
    },
  ];
  return columns;
}

export default Column;
