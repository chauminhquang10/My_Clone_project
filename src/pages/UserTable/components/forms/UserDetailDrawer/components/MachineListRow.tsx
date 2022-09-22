import { ReactComponent as InServiceIcon } from '@/assets/icons/in-service-icon.svg';
import { ReactComponent as OutOfServiceIcon } from '@/assets/icons/out-of-service-icon.svg';
import StatusTag from '@/components/TableProperties/StatusTag';
import { TextCell } from '@/components/TableProperties/TableCell';
import { Col, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import styles from '../UserDetailDrawer.less';

enum STATUS_TAG {
  IN_SERVICE = 'ACTIVE',
  OUT_OF_SERVICE = 'INACTIVE',
  UNKNOWN = 'DEFAULT',
  OFFLINE = 'DISABLE',
}

enum STATUS_TITLE {
  IN_SERVICE = 'IN SERVICE',
  OUT_OF_SERVICE = 'OUT OF SERVICE',
  UNKNOWN = 'UNKNOWN',
  OFFLINE = 'OFFLINE',
}

const STATUS_ICON = {
  IN_SERVICE: <InServiceIcon />,
  OUT_OF_SERVICE: <OutOfServiceIcon />,
  UNKNOWN: undefined,
  OFFLINE: undefined,
};

const dataSource: API.UserDetailResponse['machines'] = [
  {
    location: 'Dia chi',
    name: 'may 1',
    terminalId: 'Text example',
    status: 'IN_SERVICE',
    ipAddress: 'Text example',
  },
  {
    location: 'Dia chi',
    name: 'may 2',
    terminalId: 'Text example',
    status: 'OUT_OF_SERVICE',
    ipAddress: 'Text example',
  },
  {
    location: 'Dia chi',
    name: 'may 3',
    terminalId: 'Text example',
    status: 'UNKNOWN',
    ipAddress: 'Text example',
  },
];

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
    width: '172.33px',
    align: 'center',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Địa chỉ IP',
    dataIndex: 'ipAddress',
    key: 'ipAddress',
    width: '172.33px',
    align: 'center',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Tình trạng',
    key: 'status',
    dataIndex: 'status',
    width: '180px',
    align: 'center',
    render: (_, { status }) => (
      <StatusTag
        title={status && STATUS_TITLE[status]}
        icon={status && STATUS_ICON[status]}
        type={status && STATUS_TAG[status]}
      />
    ),
  },
  {
    title: 'Địa chỉ máy',
    dataIndex: 'location',
    key: 'location',
    width: '172.33px',
    align: 'center',
    render: (text) => <span>{text}</span>,
  },
];

const MachineListRow: React.FC<{ machines: API.UserDetailResponse['machines'] }> = ({
  machines,
}) => {
  console.log('machines: ', machines);

  return (
    <Col span={24}>
      <Table
        columns={machineListColumns}
        dataSource={dataSource}
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
