import { MapIcon } from '@/assets';
import { openNotification } from '@/utils';
import { Drawer, Form, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import DeviceInformationCard from './components/cards/DeviceInformationCard';
import DeviceVersionCard from './components/cards/DeviceVersionCard';
import HardwareInformationCard from './components/cards/HardwareInformationCard';
import MachineHealthCard from './components/cards/MachineHealthCard';
import OveralCard from './components/cards/OveralCard';
import UnitCard from './components/cards/UnitCard';
import DeclareMachineForm from './components/forms/DeclareMachineForm';
import DeclareUnitForm from './components/forms/DeclareUnitForm';
import styles from './machineDrawer.less';
import api from '@/services/STM-APIs';

interface MachineDrawerProps {
  open: boolean;
  handleClose: () => void;
  currentEntity: API.StmInfoResponse | undefined;
}

export default function MachineDrawer({ handleClose, open, currentEntity }: MachineDrawerProps) {
  const [showEditMachineForm, setShowEditMachineForm] = useState(false);
  const [showEditUnitForm, setShowUnitForm] = useState(false);
  const handleOpenEditMachineForm = () => {
    setShowEditMachineForm(true);
  };
  const handleOpenEditUnitForm = () => {
    setShowUnitForm(true);
  };
  const handleCloseEditMachineForm = () => {
    setShowEditMachineForm(false);
  };
  const handleCloseEditUnitForm = () => {
    setShowUnitForm(false);
  };
  const [detailMachine, setDetailMachine] = useState<API.StmDetailResponse | undefined>();

  const { run: getMachineDetail } = useRequest(
    (params: API.getMachineDetailParams) => api.STMController.getMachineDetail(params),
    {
      manual: true,
      onSuccess: (res) => {
        if (!res) {
          openNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau');
        }
        setDetailMachine(res);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  useEffect(() => {
    if (currentEntity?.id) {
      const params: API.getMachineDetailParams = {
        id: currentEntity?.id,
      };
      getMachineDetail(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEntity]);

  return (
    <>
      <Drawer className={styles.machineDrawer} width={880} open={open} onClose={handleClose}>
        <div className={styles.drawerSectionContainer}>
          <div className={styles.drawerHeader}>
            <Typography.Title level={4}>{detailMachine?.name}</Typography.Title>
            <Space size={10}>
              <img src={MapIcon} />
              <Typography.Text className={styles.machineLocation}>
                {detailMachine?.address}
              </Typography.Text>
            </Space>
          </div>
          <Form layout="vertical" className={styles.drawerBody}>
            <OveralCard className={styles.myCard} {...detailMachine} />
            <MachineHealthCard health={detailMachine?.driveHealth} />
            <DeviceVersionCard btnClassName={styles.primaryButton} className={styles.myCard} />
            <DeviceInformationCard
              className={styles.myCard}
              onExtraClick={handleOpenEditMachineForm}
            />
            <UnitCard onExtraClick={handleOpenEditUnitForm} className={styles.myCard} />
            <HardwareInformationCard />
          </Form>
        </div>
      </Drawer>

      <DeclareMachineForm
        onFinish={async () => {
          handleCloseEditMachineForm();
          return true;
        }}
        onVisibleChange={setShowEditMachineForm}
        visible={showEditMachineForm}
        width="934px"
      />
      <DeclareUnitForm
        onFinish={async () => {
          handleCloseEditUnitForm();
          return true;
        }}
        onVisibleChange={setShowUnitForm}
        visible={showEditUnitForm}
        width="934px"
      />
    </>
  );
}
