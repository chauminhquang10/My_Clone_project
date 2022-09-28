import HeadCell from '@/components/TableProperties/HeadCell';
import StorageStatus from '@/components/TableProperties/StorageStatus';
import { TextCell } from '@/components/TableProperties/TableCell';
import { Table, Card } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { FormattedMessage } from 'umi';

interface HardwareInformationCardType extends API.StmDetailResponse {
  children?: React.ReactNode;
}

const columns: ColumnsType<API.PhysicalDeviceInfo> = [
  {
    title: (
      <HeadCell>
        <FormattedMessage id="hardware-information.deviceType" />
      </HeadCell>
    ),
    render: (_, entity) => {
      return <TextCell>{entity.device?.name}</TextCell>;
    },
  },
  {
    title: (
      <HeadCell>
        <FormattedMessage id="hardware-information.physicalCondition" />
      </HeadCell>
    ),
    render: (_, entity) => {
      return <TextCell>{entity.physicalStatus}</TextCell>;
    },
  },
  {
    title: (
      <HeadCell>
        <FormattedMessage id="hardware-information.stored" />
      </HeadCell>
    ),
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
      title={<FormattedMessage id="hardware-information.title" />}
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
