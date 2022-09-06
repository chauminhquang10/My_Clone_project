import { ReactComponent as IconError } from '@/assets/icons/icon-error.svg';
import { ReactComponent as IconWarning } from '@/assets/icons/icon-warning.svg';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const iconNotification = {
  error: <IconError />,
  warning: <IconWarning />,
};

export const openNotification = (type: NotificationType, message: string, description: string) => {
  notification[type]({
    message,
    description,
    placement: 'top',
    icon: iconNotification[type] || undefined,
  });
};
