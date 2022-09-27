import { ReactComponent as DefaultIcon } from '@/assets/images/svg/icon/wrapper-icon.svg';
import { Button, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './StatusTag.less';

export const STATUS_STYLES = {
  DEFAULT: 'defaultStatus',
  ACTIVE: 'activeStatus',
  INACTIVE: 'inActiveStatus',
  DISABLE: 'disableStatus',
  OFFLINE: 'offline',
};

type ItemType = {
  title: string;
  type: keyof typeof STATUS_STYLES;
};

type StatusTagProps = {
  title?: string;
  icon?: React.ReactNode;
  type?: keyof typeof STATUS_STYLES;
  width?: string;
  changableStatus?: {
    loop?: boolean;
    statusItems: ItemType[];
    initialStatus?: ItemType;
    swapIcon?: React.ReactNode;
  };
};

type SwitchIconStatusProps = {
  switchIcon: React.ReactNode;
  switchLoop: boolean;
  currentStatusProp: number;
  setCurrentStatusProp: (callback: ((val: number) => number) | number) => void;
  statusLength: number;
};

const INITIAL_STATUS_INDEX = 0;

const StatusTag: React.FC<StatusTagProps> = ({ title, icon, type, width, changableStatus }) => {
  const [currentStatus, setCurrentStatus] = useState<number>(INITIAL_STATUS_INDEX);

  const [checkStatusStyle, setCheckStatusStyle] = useState(STATUS_STYLES.DEFAULT);

  useEffect(() => {
    if (changableStatus?.initialStatus) {
      // const currentStatusIndex = changableStatus?.statusItems.indexOf(
      //   changableStatus.initialStatus,
      // );
      const currentStatusIndex = changableStatus.statusItems.findIndex(
        (item) => item.type === changableStatus.initialStatus?.type,
      );

      setCurrentStatus(currentStatusIndex);
      setCheckStatusStyle(changableStatus?.initialStatus?.type);
    } else if (type && STATUS_STYLES.hasOwnProperty(type.toUpperCase())) {
      setCheckStatusStyle(STATUS_STYLES[type.toUpperCase()]);
    }
  }, [changableStatus, type]);

  const SwitchStatusIcon: React.FC<SwitchIconStatusProps> = ({
    switchIcon,
    switchLoop,
    currentStatusProp,
    setCurrentStatusProp,
    statusLength,
  }) => {
    const [tooltipIndexStatus, setTooltipIndexStatus] = useState<number>(currentStatusProp);

    const [canSwitch, setCanSwitch] = useState<boolean>(true);

    useEffect(() => {
      if (currentStatusProp < statusLength - 1) {
        setTooltipIndexStatus((prev: number) => prev + 1);
      } else {
        if (switchLoop) {
          setTooltipIndexStatus(INITIAL_STATUS_INDEX);
        } else {
          setCanSwitch(false);
        }
      }
    }, [currentStatusProp, statusLength, switchLoop]);

    const handleIconClick = () => {
      if (currentStatusProp < statusLength - 1) {
        setCurrentStatusProp((prev: number) => prev + 1);
      } else {
        if (switchLoop) {
          setCurrentStatusProp(INITIAL_STATUS_INDEX);
        }
      }
    };

    return (
      <>
        {canSwitch && (
          <Tooltip
            placement="bottom"
            title={changableStatus?.statusItems[tooltipIndexStatus].title}
          >
            <div
              onClick={() => {
                handleIconClick();
              }}
            >
              {switchIcon ? switchIcon : <DefaultIcon style={{ width: '18px', height: '18px' }} />}
            </div>
          </Tooltip>
        )}
      </>
    );
  };

  return (
    <Button
      className={`${styles.myCustomStatusTag} ${styles[STATUS_STYLES[checkStatusStyle]]}`}
      style={{ width: width ? width : '100%' }}
    >
      {changableStatus ? (
        <div className={styles.statusContent}>
          <span className={styles.statusTitle}>
            {changableStatus.statusItems[currentStatus].title}
          </span>
          <SwitchStatusIcon
            switchIcon={changableStatus.swapIcon}
            switchLoop={changableStatus?.loop || false}
            currentStatusProp={currentStatus}
            setCurrentStatusProp={setCurrentStatus}
            statusLength={changableStatus?.statusItems.length}
          />
        </div>
      ) : (
        <div className={styles.statusContent}>
          <span className={styles.statusTitle}>{title ? title : 'UNKNOWN'}</span>
          {icon ? icon : <DefaultIcon style={{ width: '18px', height: '18px' }} />}
        </div>
      )}
    </Button>
  );
};

export default StatusTag;
