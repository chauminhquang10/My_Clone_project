import { ReactComponent as ErrorIcon } from '@/assets/images/svg/icon/error-tag-icon.svg';
import { ReactComponent as SuccessIcon } from '@/assets/images/svg/icon/success-tag-icon.svg';
import { ReactComponent as SwapIcon } from '@/assets/images/svg/icon/swap-tag-icon.svg';
import { ReactComponent as WarningIcon } from '@/assets/images/svg/icon/warning-tag-icon.svg';
import { Button, Tooltip } from 'antd';
import styles from './index.less';

const DEFAULT_TAG = {
  success: {
    title: 'IN SERVICE',
    icon: <SuccessIcon />,
  },
  warning: {
    title: 'OUT OF SERVICE',
    icon: <WarningIcon />,
  },
  error: {
    title: 'OFFLINE',
    icon: <ErrorIcon />,
  },
  default: {
    title: 'UNKNOWN',
    icon: null,
  },
};

interface IStatusTag {
  type: 'success' | 'warning' | 'error' | 'default' | undefined;
  title?: string;
  icon?: React.ReactNode;
}

interface StatusTagProps {
  type: 'success' | 'warning' | 'error' | 'default' | undefined;
  title?: string;
  icon?: React.ReactNode;
  titleNext?: string;
  width?: string;
  swapIcon?: React.ReactNode;
  handleChange?: (prev: IStatusTag) => void;
}

const StatusTag: React.FC<StatusTagProps> = ({
  width = '100%',
  swapIcon = <SwapIcon />,
  titleNext,
  handleChange,
  type,
  title,
  icon,
}) => {
  // if dont change status, return
  const { title: defaultTitle, icon: defaultIcon } = DEFAULT_TAG[type || 'default'];

  return (
    <Button
      className={`${styles.myCustomStatusTag} ${styles[type || 'default']}`}
      style={{ width }}
    >
      <div className={styles.statusContent}>
        <span className={styles.statusTitle}>{title || defaultTitle}</span>
        {titleNext ? (
          <span
            onClick={() => {
              if (!handleChange) return;
              handleChange({ type, title, icon });
            }}
          >
            <Tooltip placement="bottom" title={titleNext}>
              {swapIcon}
            </Tooltip>
          </span>
        ) : (
          icon || defaultIcon
        )}
      </div>
    </Button>
  );
};

export default StatusTag;
