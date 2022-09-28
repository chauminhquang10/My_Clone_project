import { EditOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import type { MouseEventHandler } from 'react';
import CardInputBody from './CardInputBody';
import type { CardCol } from './CardInputBody';

export interface UnitCardProps extends API.StmDetailResponse {
  onExtraClick?: MouseEventHandler;
  className?: string;
}

export default function UnitCard({
  onExtraClick,
  className: cardClassName,
  managementUnit,
  managementUsers,
}: UnitCardProps) {
  const listInfor: CardCol[] = [];
  managementUsers?.forEach((item, index) => {
    listInfor.push({
      props: { span: 8 },
      formItemProps: { label: index === 0 ? 'Mã - Tên nhân viên quản lý' : '' },
      inputProps: {
        disabled: true,
        placeholder: managementUsers ? item.name : '',
      },
    });
    listInfor.push({
      props: { span: 8 },
      formItemProps: { label: index === 0 ? 'Số điện thoại' : '' },
      inputProps: {
        disabled: true,
        placeholder: managementUsers ? item.phoneNumber : '',
      },
    });
    listInfor.push({
      props: { span: 8 },
      formItemProps: { label: index === 0 ? 'Email' : '' },
      inputProps: {
        disabled: true,
        placeholder: managementUsers ? item.email : '',
      },
    });
  });

  const cols: CardCol[] = [
    {
      props: { span: 8 },
      formItemProps: { label: 'Mã - Tên đơn vị', name: 'Mã - Tên đơn vị' },
      inputProps: {
        disabled: true,
        placeholder: `${managementUnit?.code} - ${managementUnit?.name}`,
      },
    },
    {
      props: { span: 16 },
      formItemProps: { label: 'Địa chỉ đơn vị', name: 'Địa chỉ đơn vị' },
      inputProps: { disabled: true, placeholder: managementUnit?.address },
    },
    ...listInfor,
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
