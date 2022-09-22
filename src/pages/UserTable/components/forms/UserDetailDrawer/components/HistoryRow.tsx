import { Col, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import UserHistoryAction from '../../UserHistoryAction';
import styles from '../UserDetailDrawer.less';

interface DataType {
  staffId: string;
  action: string;
  createdTime: Date;
}

interface HistoryRowProps {}

// history user
const HistoryRow: React.FC<HistoryRowProps> = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Người thực hiện',
      dataIndex: 'staffId',
      key: 'staffId',
      align: 'left',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Hành động',
      key: 'action',
      dataIndex: 'action',
      align: 'left',
      render: (_, { action }) => <UserHistoryAction action={action} />,
    },
    {
      title: 'Ngày thực hiện',
      key: 'createdTime',
      align: 'center',
      render: (_, { createdTime }) => <span>{createdTime.toLocaleDateString()}</span>,
    },
  ];

  const data: DataType[] = [
    {
      staffId: '1',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '2',
      action: 'lock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
    {
      staffId: '3',
      action: 'unlock',
      createdTime: new Date(),
    },
  ];

  return (
    <Col span={24}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => 'Lịch sử'}
        className={styles.myTable}
        pagination={false}
        scroll={{ y: 200 }}
      />
    </Col>
  );
};

export default HistoryRow;
