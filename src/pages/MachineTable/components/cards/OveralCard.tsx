import StatusTag from '@/components/TableProperties/StatusTag';
import { Card } from 'antd';
import CardInputBody from './CardInputBody';
import type { CardCol } from './CardInputBody';

interface OveralCardProps {
  className: string;
}

export default function OveralCard({ className }: OveralCardProps) {
  const cols: CardCol[] = [
    {
      formItemProps: { name: 'MachineType', label: 'Loại máy' },
      inputProps: { disabled: true, placeholder: 'Smart Teller Machine' },
      props: { span: 8 },
    },
    {
      formItemProps: { name: 'Thời gian hoạt động', label: 'Thời gian hoạt động' },
      inputProps: { disabled: true, placeholder: 'Smart Teller Machine' },
      props: { span: 8 },
    },
    {
      formItemProps: { name: 'Tình trạng máy', label: 'Tình trạng máy' },
      formItemChildren: <StatusTag type="ACTIVE" />,
      props: { span: 8 },
    },
  ];

  return (
    <Card title="Tổng quan" size="small" className={className} style={{ borderRadius: 12 }}>
      <CardInputBody cols={cols} gutter={24} />
    </Card>
  );
}
