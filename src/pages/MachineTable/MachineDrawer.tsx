import { MapIcon } from '@/assets';
import { PageContainer } from '@ant-design/pro-components';
import { Drawer, Form, Space, Typography } from 'antd';
import { useState } from 'react';
import DeviceInformationCard from './components/cards/DeviceInformationCard';
import DeviceVersionCard from './components/cards/DeviceVersionCard';
import HardwareInformationCard from './components/cards/HardwareInformationCard';
import MachineHealthCard from './components/cards/MachineHealthCard';
import OveralCard from './components/cards/OveralCard';
import UnitCard from './components/cards/UnitCard';
import DeclareMachineForm from './components/forms/DeclareMachineForm';
import DeclareUnitForm from './components/forms/DeclareUnitForm';
import styles from './machineDrawer.less';

interface MachineDrawerProps {
  open: boolean;
  handleClose: () => void;
}

export default function MachineDrawer({ handleClose, open }: MachineDrawerProps) {
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

  return (
    <>
      <PageContainer>
        <Drawer className={styles.machineDrawer} width={880} open={open} onClose={handleClose}>
          <div className={styles.drawerSectionContainer}>
            <div className={styles.drawerHeader}>
              <Typography.Title level={4}>STM Ngô Gia Tự</Typography.Title>
              <Space size={10}>
                <img src={MapIcon} />
                <Typography.Text className={styles.machineLocation}>
                  228-230 Ngô Gia Tự, Phường 4, Quận 10, Thành phố Hồ Chí Minh
                </Typography.Text>
              </Space>
            </div>
            <Form layout="vertical" className={styles.drawerBody}>
              <OveralCard className={styles.myCard} />
              <MachineHealthCard />
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
      </PageContainer>
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
