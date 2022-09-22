import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell, UserCellGroup } from '@/components/TableProperties//TableCell';

type ColumnProps = {
  setCurrentRow: (s: API.RoleGroupResponse) => void;
  setShowDetail: (s: boolean) => void;
};

function Column({ setShowDetail, setCurrentRow }: ColumnProps) {
  const columns: ProColumns<API.RoleGroupResponse>[] = [
    {
      title: <HeadCell>STT</HeadCell>,
      dataIndex: 'id',
      render: (dom) => {
        const stt = dom as number;
        return <TextCell>{stt}</TextCell>;
      },
    },
    {
      title: <HeadCell>Tên nhóm quyền</HeadCell>,
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
      sorter: (a, b) => {
        if (a.name && b.name) {
          return a.name?.localeCompare(b.name);
        } else return 1;
      },
    },
    {
      title: <HeadCell>Nhân viên sở hữu nhóm quyền</HeadCell>,
      dataIndex: 'users',
      render: (_, entity) => {
        return <UserCellGroup listUser={entity.users} />;
      },
      width: '454.67px',
    },
    {
      title: <HeadCell>Người tạo</HeadCell>,
      dataIndex: 'createdBy',
      render: (_, entity) => {
        return <TextCell>{entity.createdBy?.id + ' - ' + entity.createdBy?.name}</TextCell>;
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
