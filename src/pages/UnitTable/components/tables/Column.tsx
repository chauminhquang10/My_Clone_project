import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties/TableCell';
import { formatDate } from '@/utils';

type ColumnProps = {
  setCurrentRow: (s: API.ManagementUnitResponse) => void;
  setShowDetail: (s: boolean) => void;
  setParamFilter: React.Dispatch<React.SetStateAction<API.getAllManagementUnitsParams | undefined>>;
  paramFilter: API.getAllManagementUnitsParams | undefined;
};

function Column({ setCurrentRow, setShowDetail }: ColumnProps) {
  const columns: ProColumns<API.ManagementUnitResponse>[] = [
    {
      title: <HeadCell>STT</HeadCell>,
      render: (_, __, index) => {
        return <TextCell>{index + 1}</TextCell>;
      },
    },
    {
      title: <HeadCell>Mã đơn vị</HeadCell>,
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
      title: <HeadCell>Tên đơn vị</HeadCell>,
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
      title: <HeadCell>Khu vực</HeadCell>,
      dataIndex: 'location',
      render: (dom) => {
        return <TextCell position="left">{dom}</TextCell>;
      },
    },
    {
      title: <HeadCell>Tỉnh/Thành</HeadCell>,
      dataIndex: 'province',
      render: (_, entity) => {
        return <TextCell position="left">{entity.province?.name}</TextCell>;
      },
    },
    {
      title: <HeadCell>Quận/Huyện</HeadCell>,
      dataIndex: 'district',
      valueType: 'textarea',
      render: (_, entity) => {
        return <TextCell>{entity.district?.name}</TextCell>;
      },
    },
    {
      title: <HeadCell>Phường/Xã</HeadCell>,
      dataIndex: 'ward',
      valueType: 'textarea',
      render: (_, entity) => {
        // console.log(typeof dom);
        return <TextCell>{entity.ward?.name}</TextCell>;
      },
    },
    {
      title: <HeadCell>Tên đường/Số nhà</HeadCell>,
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
      title: <HeadCell>Ngày tạo</HeadCell>,
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
