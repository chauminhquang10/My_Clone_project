import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell, UserCellGroup } from '@/components/TableProperties//TableCell';
import { formatDate } from '@/utils';

import { useIntl } from 'umi';

type ColumnProps = {
  setCurrentRow: (s: API.RoleGroupResponse) => void;
  setShowDetail: (s: boolean) => void;
};

function Column({ setShowDetail, setCurrentRow }: ColumnProps) {
  const intl = useIntl();

  const columns: ProColumns<API.RoleGroupResponse>[] = [
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'tableColumn_indexTitle',
          })}
        </HeadCell>
      ),
      dataIndex: 'id',
      render: (dom) => {
        const stt = dom as number;
        return <TextCell>{stt}</TextCell>;
      },
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'roleGroup_tableColumn_roleGroupName',
          })}
        </HeadCell>
      ),
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
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'roleGroup_tableColumn_roleGroupOwner',
          })}
        </HeadCell>
      ),
      dataIndex: 'users',
      render: (_, entity) => {
        return <UserCellGroup listUser={entity.users} />;
      },
      width: '454.67px',
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'roleGroup_tableColumn_roleGroupCreatedBy',
          })}
        </HeadCell>
      ),
      dataIndex: 'createdBy',
      render: (_, entity) => {
        const value = entity.createdBy?.staffId
          ? `${entity.createdBy?.staffId} - ${entity.createdBy?.name}`
          : entity.createdBy?.name;
        return <TextCell>{value}</TextCell>;
      },
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'tableColumn_createdDate',
          })}
        </HeadCell>
      ),
      dataIndex: 'createdAt',
      render: (dom) => {
        return <TextCell>{formatDate(dom as string)}</TextCell>;
      },
    },
  ];
  return columns;
}

export default Column;
