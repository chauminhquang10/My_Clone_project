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
  type: 'success' | 'warning' | 'error' | 'default';
  title?: string;
  icon?: React.ReactNode;
}

interface StatusTagProps {
  currentTag: IStatusTag;
  swapTag?: IStatusTag;
  width?: string;
  swapIcon?: React.ReactNode;
  handleChange?: (prev: IStatusTag) => void;
}

const StatusTag: React.FC<StatusTagProps> = ({
  currentTag,
  width = '100%',
  swapIcon = <SwapIcon />,
  swapTag,
  handleChange,
}) => {
  // if dont change status, return
  const { title: defaultTitle, icon: defaultIcon } = DEFAULT_TAG[currentTag.type];

  return (
    <Button className={`${styles.myCustomStatusTag} ${styles[currentTag.type]}`} style={{ width }}>
      <div className={styles.statusContent}>
        <span className={styles.statusTitle}>{currentTag.title || defaultTitle}</span>
        {swapTag ? (
          <span
            onClick={() => {
              if (!handleChange) return;
              handleChange({ ...currentTag });
            }}
          >
            <Tooltip placement="bottom" title={swapTag.title || DEFAULT_TAG[swapTag.type].title}>
              {swapIcon}
            </Tooltip>
          </span>
        ) : (
          currentTag.icon || defaultIcon
        )}
      </div>
    </Button>
  );
};

export default StatusTag;
