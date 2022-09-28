/* eslint-disable react-hooks/rules-of-hooks */
import MachineStatusTag from '@/components/Common/MachineStatusTag';
import { TextCell } from '@/components/TableProperties/TableCell';
import { Badge, Col, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useIntl } from 'umi';
import styles from '../UserDetailDrawer.less';

const TableTitle: React.FC<{ title: string; quantity?: number }> = ({ title, quantity }) => {
  return (
    <div className={styles.tableTitle}>
      <span>{title}</span>
      {Boolean(quantity && quantity > 0) && (
        <Badge count={quantity} style={{ backgroundColor: '#E6F7FF', color: '#1890FF' }} />
      )}
    </div>
  );
};

const MachineListRow: React.FC<{ machines: API.UserDetailResponse['machines'] }> = ({
  machines,
}) => {
  const machineListColumns: ColumnsType<API.StmInfoResponse> = [
    {
      title: useIntl().formatMessage({ id: 'machineName' }),
      dataIndex: 'name',
      key: 'name',
      width: '140px',
      align: 'left',
      render: (text) => <TextCell>{text}</TextCell>,
    },
    {
      title: useIntl().formatMessage({ id: 'terminalId' }),
      dataIndex: 'terminalId',
      key: 'terminalId',
      width: '258px',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: useIntl().formatMessage({ id: 'ipAddress' }),
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: '258px',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: useIntl().formatMessage({ id: 'status' }),
      key: 'status',
      dataIndex: 'status',
      width: '180px',
      align: 'center',
      render: (_, { status }) => status && <MachineStatusTag type={status} />,
    },
  ];

  return (
    <Col span={24}>
      <Table
        columns={machineListColumns}
        dataSource={machines}
        bordered
        title={() => (
          <TableTitle
            title={useIntl().formatMessage({ id: 'detailDrawer_machineCard_title' })}
            quantity={machines?.length}
          />
        )}
        className={styles.myMachineListTable}
        pagination={false}
        scroll={{ y: 200 }}
      />
    </Col>
  );
};

export default MachineListRow;
