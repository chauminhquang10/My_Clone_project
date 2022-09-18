import Card from '@/components/Card';
import { Table } from 'antd';
import { data, informationColumns } from '../../data';

export default function HardwareInformationCard() {
  return (
    <Card
      title="Thông tin phần cứng"
      size="small"
      style={{ borderRadius: 12 }}
      bodyStyle={{ padding: 0 }}
    >
      <Table columns={informationColumns} dataSource={data} pagination={false} bordered />
    </Card>
  );
}
