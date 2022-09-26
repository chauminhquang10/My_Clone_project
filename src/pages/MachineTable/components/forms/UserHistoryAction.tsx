import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import React from 'react';

type UserHistoryActionProps = {
  action: string;
};

const ACTION_TITLES = { unlock: 'Mở khóa', lock: 'Tạm khóa' };

const ACTION_ICONS = {
  unlock: <UnlockOutlined style={{ width: '16px', height: '16px' }} />,
  lock: <LockOutlined style={{ width: '16px', height: '16px' }} />,
};

const UserHistoryAction: React.FC<UserHistoryActionProps> = ({ action }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {ACTION_ICONS[action]}
      <span>{ACTION_TITLES[action]}</span>
    </div>
  );
};

export default UserHistoryAction;
