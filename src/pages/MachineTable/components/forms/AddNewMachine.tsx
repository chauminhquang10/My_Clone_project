import { FormInstance, ModalForm } from '@ant-design/pro-components';
import type { Dispatch, SetStateAction } from 'react';
import { useStepsForm } from 'sunflower-antd';
import styles from './declareMachineForm.less';
import DeclareMachineStep from './DeclareMachineStep';
import DeclareUnitStep from './DeclareUnitStep';
import Api from '@/services/STM-APIs';
import { openNotification } from '@/utils';

interface AddNewMachineProps {
  visible: boolean;
  handleModalVisible: Dispatch<SetStateAction<boolean>>;
}

export default function AddNewMachine({ handleModalVisible, visible }: AddNewMachineProps) {
  const {
    form,
    current: step,
    gotoStep: setStep,
    // stepsProps,
    formProps,
    submit,
    // formLoading,
  } = useStepsForm({
    async submit(values) {
      console.log(values);
      try {
        const postMachineRes = await Api.STMController.createMachine({
          ...values,
          privateKey: 'test-private',
        } as API.CreateStmRequest);

        if (postMachineRes.code === 0) {
          openNotification(
            'success',
            'Khai báo máy thành công',
            `Khai báo thành công cho máy ${postMachineRes.data?.name}`,
          );
        }

        return 'ok';
      } catch (e) {
        console.log(e);
      }
    },
    total: 2,
  });

  const handleResetForm = () => {
    (form as FormInstance).resetFields();
  };

  const handleCancle = () => {
    handleModalVisible(false);
    setStep(0);
    handleResetForm();
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const formList = [
    <DeclareMachineStep form={form} onCancel={handleCancle} onOk={() => setStep(step + 1)} />,
    <DeclareUnitStep
      form={form}
      onPrevious={handlePrevious}
      submit={submit}
      onCancel={handleCancle}
    />,
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
