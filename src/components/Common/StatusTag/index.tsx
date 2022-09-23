// import { ReactComponent as ErrorIcon } from '@/assets/images/svg/icon/error-tag-icon.svg';
// import { ReactComponent as SuccessIcon } from '@/assets/images/svg/icon/success-tag-icon.svg';
// import { ReactComponent as SwapIcon } from '@/assets/images/svg/icon/swap-tag-icon.svg';
// import { ReactComponent as WarningIcon } from '@/assets/images/svg/icon/warning-tag-icon.svg';
import { Button } from 'antd';
import styles from './index.less';

interface StatusTagProps {
  type?: 'success' | 'warning' | 'error' | 'default';
  title?: string;
  icon?: React.ReactNode;
  width?: string;
}

const StatusTag: React.FC<StatusTagProps> = ({ width = '100%', title, icon, type }) => {
  return (
    <Button
      className={`${styles.myCustomStatusTag} ${styles[type || 'default']}`}
      style={{ width }}
    >
      <div className={styles.statusContent}>
        <span className={styles.statusTitle}>{title}</span>
        {icon}
      </div>
    </Button>
  );
};

export default StatusTag;
