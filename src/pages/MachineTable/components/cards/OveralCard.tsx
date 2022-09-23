import { Card } from 'antd';
import CardInputBody from './CardInputBody';
import type { CardCol } from './CardInputBody';
// import { ExclamationCircleFilled } from '@ant-design/icons';
import StatusTag from '@/components/TableProperties/StatusTag';

interface OveralCardProps extends API.StmDetailResponse {
  className?: string;
}

type enumType = 'DEFAULT' | 'ACTIVE' | 'INACTIVE' | 'OFFLINE' | 'DISABLE' | undefined;

const valueEnum = {
  UNKNOWN: {
    text: 'UNKNOWN',
    type: 'DEFAULT',
    icon: undefined,
    changableStatus: undefined,
  },
  OFFLINE: {
    text: 'IN SERVICE',
    type: 'ACTIVE',
    icon: undefined,
    changableStatus: {
      loop: true,
      statusItems: [
        {
          title: 'IN SERVICE',
          type: 'ACTIVE',
        },
        {
          title: 'OUT OF SERVICE',
          type: 'INACTIVE',
        },
      ],
      initialStatus: {
        title: 'IN SERVICE',
        type: 'ACTIVE',
      },
    },
  },
  OUT_OF_SERVICE: {
    text: 'OUT OF SERVICE',
    type: 'INACTIVE',
    icon: undefined,
    changableStatus: {
      loop: true,
      statusItems: ['ACTIVE', 'INACTIVE'],
      initialStatus: 'INACTIVE',
    },
  },
  // OFFLINE: {
  //   text: 'OFFLINE',
  //   type: 'OFFLINE',
  //   icon: (
  //     <ExclamationCircleFilled
  //       style={{
  //         color: '#A8071A',
  //       }}
  //     />
  //   ),
  //   changableStatus: undefined,
  // },
};
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
      formItemChildren: status && (
        <StatusTag
          title={valueEnum[status].text}
          type={valueEnum[status].type as enumType}
          // icon={valueEnum[status]}
          changableStatus={valueEnum[status].changableStatus}
        />
      ),
      props: { span: 8 },
    },
  ];

  return (
    <Card title="Tổng quan" size="small" className={className} style={{ borderRadius: 12 }}>
      <CardInputBody cols={cols} gutter={24} />
    </Card>
  );
}
