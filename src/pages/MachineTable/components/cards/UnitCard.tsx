import { EditOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { MouseEventHandler } from 'react';
import CardInputBody, { CardCol } from './CardInputBody';

export interface UnitCardProps {
  onExtraClick: MouseEventHandler;
  className?: string;
}

export default function UnitCard({ onExtraClick, className: cardClassName }: UnitCardProps) {
  const cols: CardCol[] = [
    {
      props: { span: 8 },
      formItemProps: { label: 'Mã - Tên đơn vị', name: 'Mã - Tên đơn vị' },
      inputProps: { disabled: true, placeholder: 'example' },
    },
    {
      props: { span: 16 },
      formItemProps: { label: 'Địa chỉ đơn vị', name: 'Địa chỉ đơn vị' },
      inputProps: { disabled: true, placeholder: 'example' },
    },
    {
      props: { span: 8 },
      formItemProps: { label: 'Mã - Tên nhân viên quản lý', name: 'Mã - Tên nhân viên quản lý' },
      inputProps: { disabled: true, placeholder: 'example' },
    },
    {
      props: { span: 8 },
      formItemProps: { label: 'Số điện thoại', name: 'Số điện thoại' },
      inputProps: { disabled: true, placeholder: 'example' },
    },
    {
      props: { span: 8 },
      formItemProps: { label: 'Email', name: 'Email' },
      inputProps: { disabled: true, placeholder: 'example' },
    },
  ];

  return (
    <Card
      title="Đơn vị quản lý"
      extra={
        <Button type="link" onClick={onExtraClick} icon={<EditOutlined />}>
          Chỉnh sửa
        </Button>
      }
      size="small"
      className={cardClassName}
      style={{ borderRadius: 12 }}
    >
      <CardInputBody gutter={24} align="bottom" cols={cols} />
    </Card>
  );
}
