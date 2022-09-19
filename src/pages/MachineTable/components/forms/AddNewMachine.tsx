import { ModalForm } from '@ant-design/pro-components';
import type { Dispatch, SetStateAction } from 'react';
import { useStepsForm } from 'sunflower-antd';
import styles from './declareMachineForm.less';
import DeclareMachineStep from './DeclareMachineStep';
import DeclareUnitStep from './DeclareUnitStep';

interface AddNewMachineProps {
  visible: boolean;
  handleModalVisible: Dispatch<SetStateAction<boolean>>;
}

export default function AddNewMachine({ handleModalVisible, visible }: AddNewMachineProps) {
  const {
    // form,
    current: step,
    gotoStep: setStep,
    // stepsProps,
    formProps,
    submit,
    // formLoading,
  } = useStepsForm({
    async submit(values) {
      console.log(values);
      await new Promise((r) => setTimeout(r, 1000));
      return 'ok';
    },
    total: 2,
  });
  console.log('Render');

  const handleCancle = () => {
    handleModalVisible(false);
    setStep(0);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const formList = [
    <DeclareMachineStep onCancel={handleCancle} onOk={() => setStep(step + 1)} />,
    <DeclareUnitStep onPrevious={handlePrevious} submit={submit} onCancel={handleCancle} />,
  ];

  return (
    <ModalForm
      {...formProps}
      width="934px"
      visible={visible}
      onVisibleChange={handleModalVisible}
      onFinish={undefined}
      submitTimeout={5000}
      layout="vertical"
      modalProps={{
        centered: true,
        closable: false,
        destroyOnClose: true,
        className: styles.myModalForm,
      }}
    >
      {formList[step]}
    </ModalForm>
  );
}
