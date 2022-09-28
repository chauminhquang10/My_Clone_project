import { TextCell, UserCellStatus, UserStatusCell } from '@/components/TableProperties//TableCell';
import HeadCell from '@/components/TableProperties/HeadCell';
import { formatPhoneNumber } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';

type ColumnProps = {
  setCurrentRow: (s: API.UserResponse) => void;
  setShowDetail: (s: boolean) => void;
  setParamFilter: React.Dispatch<React.SetStateAction<API.getAllUsersParams | undefined>>;
  paramFilter: API.getAllUsersParams | undefined;
};

function Column({ setCurrentRow, setShowDetail }: ColumnProps) {
  const columns: ProColumns<API.UserResponse>[] = [
    {
      title: <HeadCell>STT</HeadCell>,
      render: (_, __, index) => {
        return <TextCell>{index + 1}</TextCell>;
      },
      width: '5%',
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
      width: '9%',
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
      width: '21%',
    },
    {
      title: <HeadCell>Mã - Tên đơn vị</HeadCell>,
      dataIndex: 'managementUnit',
      render: (dom, entity) => {
        return (
          <TextCell position="left">{`${entity.managementUnit?.code} - ${entity.managementUnit?.name}`}</TextCell>
        );
      },
      width: '21%',
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
      width: '21%',
    },
    {
      title: <HeadCell>Số điện thoại</HeadCell>,
      dataIndex: 'phoneNumber',
      valueType: 'textarea',
      render: (dom) => {
        return <TextCell>{formatPhoneNumber(dom as string)}</TextCell>;
      },
      width: '12%',
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
      width: '13%',
    },
  ];
  return columns;
}

export default Column;
