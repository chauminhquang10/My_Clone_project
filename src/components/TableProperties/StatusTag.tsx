import { ReactComponent as DefaultIcon } from '@/assets/images/svg/icon/wrapper-icon.svg';
import { Button, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './StatusTag.less';

const STATUS_STYLES = {
  DEFAULT: 'defaultStatus',
  ACTIVE: 'activeStatus',
  INACTIVE: 'inActiveStatus',
  DISABLE: 'disableStatus',
};

type StatusTagProps = {
  title?: string;
  icon?: React.ReactNode;
  type?: keyof typeof STATUS_STYLES;
  width?: string;
  changableStatus?: {
    loop?: boolean;
    statusItems: string[];
    initialStatus?: string;
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

  let checkStatusStyle = STATUS_STYLES.DEFAULT;
  if (type && STATUS_STYLES.hasOwnProperty(type.toUpperCase())) {
    checkStatusStyle = STATUS_STYLES[type.toUpperCase()];
  }

  useEffect(() => {
    if (changableStatus?.initialStatus) {
      const currentStatusIndex = changableStatus?.statusItems.indexOf(
        changableStatus.initialStatus,
      );
      setCurrentStatus(currentStatusIndex);
    }
  }, [changableStatus]);

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
          <Tooltip placement="bottom" title={changableStatus?.statusItems[tooltipIndexStatus]}>
            <div onClick={handleIconClick}>
              {switchIcon ? switchIcon : <DefaultIcon style={{ width: '18px', height: '18px' }} />}
            </div>
          </Tooltip>
        )}
      </>
    );
  };

  return (
    <Button
      className={`${styles.myCustomStatusTag} ${styles[checkStatusStyle]}`}
      style={{ width: width ? width : '100%' }}
    >
      {changableStatus ? (
        <div className={styles.statusContent}>
          <span className={styles.statusTitle}>{changableStatus.statusItems[currentStatus]}</span>
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
          <span className={styles.statusTitle}>{title ? title : 'STATUS'}</span>
          {icon ? icon : <DefaultIcon style={{ width: '18px', height: '18px' }} />}
        </div>
      )}
    </Button>
  );
};

export default StatusTag;
