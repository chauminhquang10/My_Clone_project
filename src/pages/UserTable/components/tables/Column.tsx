import { TextCell, UserCellStatus, UserStatusCell } from '@/components/TableProperties//TableCell';
import HeadCell from '@/components/TableProperties/HeadCell';
import { formatPhoneNumber } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';

type ColumnProps = {
  setCurrentRow: (s: API.UserResponse) => void;
  setShowDetail: (s: boolean) => void;
};

function Column({ setCurrentRow, setShowDetail }: ColumnProps) {
  const columns: ProColumns<API.UserResponse>[] = [
    {
      title: <HeadCell>STT</HeadCell>,
      render: (_, __, index) => {
        return <TextCell>{index + 1}</TextCell>;
      },
      width: '80px',
    },
    {
      title: <HeadCell>Mã nhân viên</HeadCell>,
      dataIndex: 'staffId',
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
      width: '140px',
    },
    {
      title: <HeadCell>Tên nhân viên</HeadCell>,
      dataIndex: 'name',
      sorter: (a, b) => {
        if (a.name && b.name) return a.name.localeCompare(b.name);
        else return 1;
      },
      hideInForm: true,
      render: (dom, entity) => {
        return (
          <TextCell
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
            position="left"
          >
            {dom}
          </TextCell>
        );
      },
      width: '328.67px',
    },
    {
      title: <HeadCell>Mã - Tên đơn vị</HeadCell>,
      dataIndex: 'managementUnit',
      //   sorter: (a, b) => {
      //     const codeNameA = `${a.managementUnit?.code} - ${a.managementUnit?.name}`;
      //     const codeNameB = `${b.managementUnit?.code} - ${b.managementUnit?.name}`;
      //     return codeNameA.localeCompare(codeNameB);
      //   },
      // filter
      render: (dom, entity) => {
        return (
          <TextCell position="left">{`${entity.managementUnit?.code} - ${entity.managementUnit?.name}`}</TextCell>
        );
      },
      width: '328.67px',
    },
    {
      title: <HeadCell>Email</HeadCell>,
      dataIndex: 'email',
      valueType: 'textarea',
      render: (dom) => {
        return (
          <TextCell position="left" blue={true}>
            {dom}
          </TextCell>
        );
      },
      width: '328.67px',
    },
    {
      title: <HeadCell>Số điện thoại</HeadCell>,
      dataIndex: 'phoneNumber',
      valueType: 'textarea',
      render: (dom) => {
        return <TextCell>{formatPhoneNumber(dom as string)}</TextCell>;
      },
      width: '180px',
    },
    {
      title: <HeadCell>Trạng thái hoạt động</HeadCell>,
      dataIndex: 'status',
      hideInForm: true,
      filters: true,
      onFilter: true,
      valueEnum: {
        ACTIVE: {
          text: <UserStatusCell status={UserCellStatus.ACTIVE} />,
        },
        INACTIVE: {
          text: <UserStatusCell status={UserCellStatus.INACTIVE} />,
        },
        UNKNOWN: {
          text: <UserStatusCell status={UserCellStatus.UNKNOWN} />,
        },
      },
      width: '200px',
    },
  ];
  return columns;
}

export default Column;
