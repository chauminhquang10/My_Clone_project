import type { FormInstance } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-components';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useMemo } from 'react';
import { useStepsForm } from 'sunflower-antd';
import styles from './declareMachineForm.less';
import DeclareMachineStep from './DeclareMachineStep';
import DeclareUnitStep from './DeclareUnitStep';
import Api from '@/services/STM-APIs';
import { genKey, openNotification } from '@/utils';
import type { ModalProps } from 'antd';

interface AddNewMachineProps {
  visible: boolean;
  handleModalVisible: Dispatch<SetStateAction<boolean>>;
}

export default function AddNewMachine({ handleModalVisible, visible }: AddNewMachineProps) {
  const {
    form,
    current: step,
    gotoStep: setStep,
    formProps,
    submit,
  } = useStepsForm({
    async submit(values) {
      console.log(values);
      try {
        const postMachineRes = await Api.STMController.createMachine(
          values as API.CreateStmRequest,
        );

        if (postMachineRes.code === 1) {
          openNotification(
            'error',
            `khai báo máy ${values.machineType} - ${values.machineName} thất bại`,
            postMachineRes.message,
          );
        }

        if (postMachineRes.code === 0) {
          openNotification(
            'success',
            'Khai báo máy thành công',
            `Khai báo thành công cho máy ${postMachineRes.data?.machineType} - ${postMachineRes.data?.name}`,
          );
        }

        return true;
      } catch (e) {
        openNotification('error', 'Khai báo máy thất bại');
      }

      return false;
    },
    total: 2,
  });

  const handleResetForm = useCallback(() => {
    (form as FormInstance).resetFields();
  }, [form]);

  const handleCancle = useCallback(() => {
    handleModalVisible(false);
    setStep(0);
    handleResetForm();
  }, [handleModalVisible, handleResetForm, setStep]);

  const handlePrevious = useCallback(() => {
    setStep((currStep: number) => currStep - 1);
  }, [setStep]);

  const handleSubmit = useCallback(() => {
    submit().then((result: unknown) => {
      if (result) {
        handleCancle();
      }
    });
  }, [handleCancle, submit]);

  const handleMachineSubmit = useCallback(
    () => setStep((prevStep: number) => prevStep + 1),
    [setStep],
  );

  const modalProps: Omit<ModalProps, 'visible'> = useMemo(
    () => ({
      centered: true,
      closable: false,
      destroyOnClose: true,
      className: styles.myModalForm,
    }),
    [],
  );

  const formList = useMemo(
    () => [
      <DeclareMachineStep
        form={form}
        onCancel={handleCancle}
        onSubmit={handleMachineSubmit}
        key={genKey()}
        submitButtonLabel="Tiếp tục"
      />,
      <DeclareUnitStep
        form={form}
        onPrevious={handlePrevious}
        onCancel={handleCancle}
        onSubmit={handleSubmit}
        submitButtonLabel="Hoàn tất"
        cancelButtonLabel="Quay lại"
        key={genKey()}
      />,
    ],
    [form, handleCancle, handlePrevious, handleSubmit, handleMachineSubmit],
  );

  return (
    <ModalForm
      {...formProps}
      width="934px"
      visible={visible}
      onVisibleChange={handleModalVisible}
      submitTimeout={5000}
      layout="vertical"
      modalProps={modalProps}
    >
      {formList[step]}
    </ModalForm>
  );
}
