import { Table, Card } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';

interface HardwareInformationCardType extends API.StmDetailResponse {
  children?: React.ReactNode;
}

const columns: ColumnsType<API.PhysicalDeviceInfo> = [
  {
    title: 'Loại thiết bị',
    dataIndex: 'deviceType',
  },
  {
    title: 'Đơn vị tính',
    dataIndex: 'unit',
  },
  {
    title: 'Sức chứa tối thiểu',
    dataIndex: 'capacity',
  },
];

const HardwareInformationCard = ({ devices }: HardwareInformationCardType) => {
  return (
    <Card
      title="Thông tin phần cứng"
      size="small"
      style={{ borderRadius: 12 }}
      bodyStyle={{ padding: 0 }}
    >
      <Table columns={columns} dataSource={devices} pagination={false} bordered />
    </Card>
  );
};
export default HardwareInformationCard;
