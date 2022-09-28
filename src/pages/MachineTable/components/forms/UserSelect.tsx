import { Space, Avatar, Typography } from 'antd';
import { memo } from 'react';

interface UserSelectProps {
  name: string;
  avatar: string | undefined | null;
}

const UserSelect = ({ avatar, name }: UserSelectProps) => {
  return (
    <Space size={8}>
      <Avatar src={avatar} style={{ verticalAlign: 'middle' }} size="large" gap={4}>
        {!avatar && name.split(' - ').at(1)?.at(0)}
      </Avatar>
      <Typography.Text>{name}</Typography.Text>
    </Space>
  );
};

export default memo(UserSelect);
