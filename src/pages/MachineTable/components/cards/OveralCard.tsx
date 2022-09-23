import MachineStatusTag from '@/components/Common/MachineStatusTag';
import { formatDate } from '@/utils';
import { Card } from 'antd';
import type { CardCol } from './CardInputBody';
import CardInputBody from './CardInputBody';

interface OveralCardProps extends API.StmDetailResponse {
  className?: string;
}

// type enumType = 'DEFAULT' | 'ACTIVE' | 'INACTIVE' | 'OFFLINE' | 'DISABLE' | undefined;

// const valueEnum = {
//   UNKNOWN: {
//     text: 'UNKNOWN',
//     type: 'DEFAULT',
//     icon: undefined,
//     changableStatus: false,
//   },
//   IN_SERVICE: {
//     text: 'IN SERVICE',
//     type: 'ACTIVE',
//     icon: undefined,
//     changableStatus: {
//       loop: true,
//       statusItems: ['ACTIVE', 'INACTIVE'],
//       initialStatus: 'ACTIVE',
//     },
//   },
//   OUT_OF_SERVICE: {
//     text: 'OUT OF SERVICE',
//     type: 'INACTIVE',
//     icon: undefined,
//     changableStatus: {
//       loop: true,
//       statusItems: ['ACTIVE', 'INACTIVE'],
//       initialStatus: 'INACTIVE',
//     },
//   },
//   OFFLINE: {
//     text: 'OFFLINE',
//     type: 'OFFLINE',
//     icon: (
//       <ExclamationCircleFilled
//         style={{
//           color: '#A8071A',
//         }}
//       />
//     ),
//   },
// };
export default function OveralCard({
  id,
  className,
  machineType,
  createdAt,
  status,
}: OveralCardProps) {
  const cols: CardCol[] = [
    {
      formItemProps: { name: 'MachineType', label: 'Loại máy' },
      inputProps: { disabled: true, placeholder: machineType },
      props: { span: 8 },
    },
    {
      formItemProps: { name: 'Thời gian hoạt động', label: 'Thời gian hoạt động' },
      inputProps: { disabled: true, placeholder: formatDate(createdAt) as string },
      props: { span: 8 },
    },
    {
      formItemProps: { name: 'Tình trạng máy', label: 'Tình trạng máy' },
      formItemChildren: status && <MachineStatusTag type={status} machineId={id} />,
      props: { span: 8 },
    },
  ];

  return (
    <Card title="Tổng quan" size="small" className={className} style={{ borderRadius: 12 }}>
      <CardInputBody cols={cols} gutter={24} />
    </Card>
  );
}
