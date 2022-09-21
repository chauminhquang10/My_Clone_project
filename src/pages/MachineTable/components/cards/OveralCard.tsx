import { Card } from 'antd';
import CardInputBody from './CardInputBody';
import type { CardCol } from './CardInputBody';
import { MachineStatusTag } from '@/components/TableProperties/TableCell';

interface OveralCardProps extends API.StmDetailResponse {
  className?: string;
}

export default function OveralCard({ className, machineType, createdAt, status }: OveralCardProps) {
  const cols: CardCol[] = [
    {
      formItemProps: { name: 'MachineType', label: 'Loại máy' },
      inputProps: { disabled: true, placeholder: machineType },
      props: { span: 8 },
    },
    {
      formItemProps: { name: 'Thời gian hoạt động', label: 'Thời gian hoạt động' },
      inputProps: { disabled: true, placeholder: createdAt },
      props: { span: 8 },
    },
    {
      formItemProps: { name: 'Tình trạng máy', label: 'Tình trạng máy' },
      formItemChildren: <MachineStatusTag status={status ? status : 'UNKNOWN'} />,
      props: { span: 8 },
    },
  ];

  return (
    <Card title="Tổng quan" size="small" className={className} style={{ borderRadius: 12 }}>
      <CardInputBody cols={cols} gutter={24} />
    </Card>
  );
}
