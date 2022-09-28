import { MapIcon } from '@/assets';
import { openNotification } from '@/utils';
import { Drawer, Form, Space, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
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
  getAllMachine: () => void;
}

export default function MachineDrawer({
  handleClose,
  open,
  currentEntity,
  getAllMachine,
}: MachineDrawerProps) {
  const [showEditMachineForm, setShowEditMachineForm] = useState(false);
  const [showEditUnitForm, setShowUnitForm] = useState(false);
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

  const handleOpenEditMachineForm = useCallback(() => {
    setShowEditMachineForm(true);
  }, []);
  const handleOpenEditUnitForm = useCallback(() => {
    setShowUnitForm(true);
  }, []);
  const handleCloseEditMachineForm = useCallback(() => {
    setShowEditMachineForm(false);
  }, []);
  const handleCloseEditUnitForm = useCallback(() => {
    setShowUnitForm(false);
  }, []);

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
            <DeviceVersionCard
              btnClassName={styles.primaryButton}
              className={styles.myCard}
              {...detailMachine}
            />
            <DeviceInformationCard
              className={styles.myCard}
              onExtraClick={handleOpenEditMachineForm}
              {...detailMachine}
            />
            <UnitCard
              onExtraClick={handleOpenEditUnitForm}
              className={styles.myCard}
              {...detailMachine}
            />
            <HardwareInformationCard {...detailMachine} />
          </Form>
        </div>
      </Drawer>

      <DeclareMachineForm
        onVisibleChange={setShowEditMachineForm}
        onCancel={handleCloseEditMachineForm}
        visible={showEditMachineForm}
        {...detailMachine}
        handleClose={handleClose}
        getAllMachine={getAllMachine}
      />
      <DeclareUnitForm
        getAllMachine={getAllMachine}
        onVisibleChange={setShowUnitForm}
        onCancel={handleCloseEditUnitForm}
        visible={showEditUnitForm}
        handleClose={handleClose}
        {...detailMachine}
      />
    </>
  );
}
