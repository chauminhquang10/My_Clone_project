import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties/TableCell';
import { formatDate } from '@/utils';
import { useIntl } from 'umi';

type ColumnProps = {
  setCurrentRow: (s: API.ManagementUnitResponse) => void;
  setShowDetail: (s: boolean) => void;
};

function Column({ setCurrentRow, setShowDetail }: ColumnProps) {
  const intl = useIntl();
  const columns: ProColumns<API.ManagementUnitResponse>[] = [
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'tableColumn_indexTitle',
          })}
        </HeadCell>
      ),
      render: (_, __, index) => {
        return <TextCell>{index + 1}</TextCell>;
      },
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'managementUnit_tableColumn_unitCode',
          })}
        </HeadCell>
      ),
      dataIndex: 'code',
      valueType: 'textarea',
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
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'managementUnit_tableColumn_unitName',
          })}
        </HeadCell>
      ),
      dataIndex: 'name',
      sorter: true,
      hideInForm: true,
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
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'managementUnit_tableColumn_location',
          })}
        </HeadCell>
      ),
      dataIndex: 'location',
      render: (dom) => {
        return <TextCell position="left">{dom}</TextCell>;
      },
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'managementUnit_tableColumn_province',
          })}
        </HeadCell>
      ),
      dataIndex: 'province',
      render: (_, entity) => {
        return <TextCell position="left">{entity.province?.name}</TextCell>;
      },
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'managementUnit_tableColumn_district',
          })}
        </HeadCell>
      ),
      dataIndex: 'district',
      valueType: 'textarea',
      render: (_, entity) => {
        return <TextCell>{entity.district?.name}</TextCell>;
      },
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'managementUnit_tableColumn_ward',
          })}
        </HeadCell>
      ),
      dataIndex: 'ward',
      valueType: 'textarea',
      render: (_, entity) => {
        // console.log(typeof dom);
        return <TextCell>{entity.ward?.name}</TextCell>;
      },
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'managementUnit_tableColumn_address',
          })}
        </HeadCell>
      ),
      dataIndex: 'address',
      hideInForm: true,
      filters: true,
      onFilter: true,
      render: (dom) => {
        // console.log(typeof dom);
        return <TextCell>{dom}</TextCell>;
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
      hideInForm: true,
      filters: true,
      onFilter: true,
      render: (dom) => {
        // console.log(typeof dom);
        return <TextCell>{formatDate(dom as string)}</TextCell>;
      },
    },
  ];
  return columns;
}

export default Column;
