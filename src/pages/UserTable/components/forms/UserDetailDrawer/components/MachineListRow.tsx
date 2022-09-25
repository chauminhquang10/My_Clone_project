import MachineStatusTag from '@/components/Common/MachineStatusTag';
import { TextCell } from '@/components/TableProperties/TableCell';
import { Col, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import styles from '../UserDetailDrawer.less';

const machineListColumns: ColumnsType<API.StmInfoResponse> = [
  {
    title: 'Tên máy',
    dataIndex: 'name',
    key: 'name',
    width: '140px',
    align: 'left',
    render: (text) => <TextCell>{text}</TextCell>,
  },
  {
    title: 'Terminal ID',
    dataIndex: 'terminalId',
    key: 'terminalId',
    width: '258px',
    align: 'center',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Địa chỉ IP',
    dataIndex: 'ipAddress',
    key: 'ipAddress',
    width: '258px',
    align: 'center',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Tình trạng',
    key: 'status',
    dataIndex: 'status',
    width: '180px',
    align: 'center',
    render: (_, { status }) => status && <MachineStatusTag type={status} />,
  },
];

const MachineListRow: React.FC<{ machines: API.UserDetailResponse['machines'] }> = ({
  machines,
}) => {
  return (
    <Col span={24}>
      <Table
        columns={machineListColumns}
        dataSource={machines}
        bordered
        title={() => 'Danh sách máy quản lý'}
        className={styles.myMachineListTable}
        pagination={false}
        scroll={{ y: 200 }}
      />
    </Col>
  );
};

export default MachineListRow;
