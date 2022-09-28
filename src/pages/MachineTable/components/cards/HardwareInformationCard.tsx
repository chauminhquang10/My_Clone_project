import HeadCell from '@/components/TableProperties/HeadCell';
import StorageStatus from '@/components/TableProperties/StorageStatus';
import { TextCell } from '@/components/TableProperties/TableCell';
import { Table, Card } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';

interface HardwareInformationCardType extends API.StmDetailResponse {
  children?: React.ReactNode;
}

const columns: ColumnsType<API.PhysicalDeviceInfo> = [
  {
    title: <HeadCell>Loại thiết bị</HeadCell>,
    render: (_, entity) => {
      return <TextCell>{entity.device?.name}</TextCell>;
    },
  },
  {
    title: <HeadCell>Tình trạng vật lý</HeadCell>,
    render: (_, entity) => {
      return <TextCell>{entity.physicalStatus}</TextCell>;
    },
  },
  {
    title: <HeadCell>Dự trữ</HeadCell>,
    align: 'center',
    render: (_, entity) => {
      return <StorageStatus type={entity.storageStatus} />;
    },
  },
];

// const data: API.PhysicalDeviceInfo[] = [
//   {
//     device: {
//       name: 'test 1',
//     },
//     physicalStatus: 'OFFLINE',
//     storageStatus: 'EMPTY',
//   },
//   {
//     device: {
//       name: 'test 2',
//     },
//     physicalStatus: 'OFFLINE',
//     storageStatus: 'HIGHT',
//   },
//   {
//     device: {
//       name: 'test 3',
//     },
//     physicalStatus: 'OFFLINE',
//     storageStatus: 'FULL',
//   },
//   {
//     device: {
//       name: 'test 4',
//     },
//     physicalStatus: 'OFFLINE',
//     storageStatus: 'LOW',
//   },
//   {
//     device: {
//       name: 'test 5',
//     },
//     physicalStatus: 'OFFLINE',
//     storageStatus: 'OK',
//   },
// ];

const HardwareInformationCard = ({ devices }: HardwareInformationCardType) => {
  return (
    <Card
      title="Thông tin phần cứng"
      size="small"
      style={{ borderRadius: 12 }}
      bodyStyle={{ padding: 0 }}
    >
      <Table
        columns={columns}
        dataSource={devices?.devices}
        // dataSource={data}
        pagination={false}
        bordered
      />
    </Card>
  );
};
export default HardwareInformationCard;
