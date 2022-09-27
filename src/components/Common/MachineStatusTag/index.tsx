import { ReactComponent as ErrorIcon } from '@/assets/images/svg/icon/error-tag-icon.svg';
import { ReactComponent as SuccessIcon } from '@/assets/images/svg/icon/success-tag-icon.svg';
import { ReactComponent as WarningIcon } from '@/assets/images/svg/icon/warning-tag-icon.svg';
import { changeMachineStatus } from '@/services/STM-APIs/STMController';
import { openNotification } from '@/utils';
import { SwapOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useState } from 'react';
import StatusTag from '../StatusTag';

interface MachineStatusTagProps {
  machineId?: string;
  type: 'UNKNOWN' | 'IN_SERVICE' | 'OUT_OF_SERVICE' | 'OFFLINE';
}

const MachineStatusTag: React.FC<MachineStatusTagProps> = ({ machineId, type }) => {
  const [currentStatus, setCurrentStatus] = useState<MachineStatusTagProps['type']>(type);

  if (currentStatus === 'IN_SERVICE') {
    if (machineId)
      return (
        <StatusTag
          type="success"
          title={currentStatus.replaceAll('_', ' ')}
          icon={
            <Tooltip placement="bottom" title="OUT OF SERVICE">
              <div
                onClick={async () => {
                  try {
                    const res = await changeMachineStatus({
                      id: machineId,
                      status: 'OUT_OF_SERVICE',
                    });

                    if (res.code === 0) {
                      setCurrentStatus('OUT_OF_SERVICE');
                    }
                  } catch (error) {
                    console.log('error: ', error);
                    openNotification('error', 'Change machine status failed!');
                  }
                }}
              >
                <SwapOutlined />
              </div>
            </Tooltip>
          }
        />
      );
    else
      return (
        <StatusTag
          type="success"
          title={currentStatus.replaceAll('_', ' ')}
          icon={<SuccessIcon />}
        />
      );
  }

  if (currentStatus === 'OUT_OF_SERVICE') {
    if (machineId)
      return (
        <StatusTag
          type="warning"
          title={currentStatus.replaceAll('_', ' ')}
          icon={
            <Tooltip placement="bottom" title="IN SERVICE">
              <div
                onClick={async () => {
                  try {
                    const res = await changeMachineStatus({
                      id: machineId,
                      status: 'IN_SERVICE',
                    });
                    if (res.code === 0) {
                      setCurrentStatus('IN_SERVICE');
                    }
                  } catch (error) {
                    console.log('error: ', error);
                    openNotification('error', 'Change machine status failed!');
                  }
                }}
              >
                <SwapOutlined />
              </div>
            </Tooltip>
          }
        />
      );
    else
      return (
        <StatusTag
          type="warning"
          title={currentStatus.replaceAll('_', ' ')}
          icon={<WarningIcon />}
        />
      );
  }

  return <StatusTag type="error" title={currentStatus.replaceAll('_', ' ')} icon={<ErrorIcon />} />;
};

export default MachineStatusTag;
