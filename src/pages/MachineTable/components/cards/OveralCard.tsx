import MachineStatusTag from '@/components/Common/MachineStatusTag';
import { formatDate } from '@/utils';
import { Card } from 'antd';
import { FormattedMessage } from 'umi';
import type { CardCol } from './CardInputBody';
import CardInputBody from './CardInputBody';

interface OveralCardProps extends API.StmDetailResponse {
  className?: string;
}

export default function OveralCard({
  id,
  className,
  machineType,
  createdAt,
  status,
}: OveralCardProps) {
  const cols: CardCol[] = [
    {
      formItemProps: { name: 'MachineType', label: <FormattedMessage id="machineType" /> },
      inputProps: { disabled: true, placeholder: machineType },
      props: { span: 8 },
    },
    {
      formItemProps: {
        name: 'Thời gian hoạt động',
        label: <FormattedMessage id="machine-drawer.operation-time" />,
      },
      inputProps: { disabled: true, placeholder: formatDate(createdAt) as string },
      props: { span: 8 },
    },
    {
      formItemProps: {
        name: 'Tình trạng máy',
        label: <FormattedMessage id="machine-drawer.machine-status" />,
      },
      formItemChildren: status && <MachineStatusTag type={status} machineId={id} />,
      props: { span: 8 },
    },
  ];

  return (
    <Card
      title={<FormattedMessage id="machine-drawer.overview" />}
      size="small"
      className={className}
      style={{ borderRadius: 12 }}
    >
      <CardInputBody cols={cols} gutter={24} />
    </Card>
  );
}
