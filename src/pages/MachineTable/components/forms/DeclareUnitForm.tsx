import Api from '@/services/STM-APIs';
import { openNotification } from '@/utils';
import type { ActionType } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useCallback, useMemo } from 'react';
import DeclareUnitStep from './DeclareUnitStep';
import styles from './editMachine.less';

interface DeclareUnitFormProps extends API.StmDetailResponse {
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
  onCancel: () => void;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  handleClose: () => void;
}

export default function DeclareUnitForm({
  visible,
  onVisibleChange,
  onCancel,
  actionRef,
  handleClose,
  ...machineDetail
}: DeclareUnitFormProps) {
  const [form] = Form.useForm();
  const modalProps = useMemo(
    () => ({
      centered: true,
      closable: false,
      destroyOnClose: true,
      className: styles.myModalForm,
    }),
    [],
  );
  if (machineDetail) {
    const defaultUpdateValues: Partial<API.UpdateStmRequest> = {
      address: machineDetail.address!,
      districtId: machineDetail.district?.id || 0,
      location: machineDetail.location!,
      machineName: machineDetail.name!,
      provinceId: machineDetail.province?.id || 0,
      wardId: machineDetail.ward?.id || 0,
      latitude: machineDetail.latitude,
      longitude: machineDetail.longitude,
      managementUnitId: machineDetail.managementUnit?.id,
      userIds: machineDetail.managementUsers?.map((user) => user.id!),
    };
    form.setFieldsValue(defaultUpdateValues);
  }
  const handleFinish = useCallback(
    async (values) => {
      try {
        const res = await Api.STMController.updateMachine(
          { id: machineDetail.id! },
          {
            ...machineDetail,
            ...values,
            machineName: machineDetail.name,
            provinceId: machineDetail.province?.id,
            districtId: machineDetail.district?.id,
            wardId: machineDetail.ward?.id,
            modelId: machineDetail.model?.id,
            port: machineDetail.port,
          },
        );

        if (res.code === 1) {
          openNotification('error', 'Cập nhật thông tin thiết bị thất bại', res.message);
        }

        if (res.code === 0) {
          openNotification('success', 'Cập nhật thông tin thiết bị thành công');
          actionRef.current?.reloadAndRest?.();
        }

        onVisibleChange(false);
        handleClose();
        return true;
      } catch (e) {
        openNotification('error', 'Cập nhật thông tin thiết bị thất bại');
      }

      return false;
    },
    [machineDetail, handleClose, actionRef, onVisibleChange],
  );

  const handleReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  return (
    <ModalForm
      form={form}
      width="934px"
      visible={visible}
      onFinish={handleFinish}
      modalProps={modalProps}
      submitTimeout={2000}
      onReset={handleReset}
    >
      <DeclareUnitStep form={form} onCancel={onCancel} {...machineDetail} />
    </ModalForm>
  );
}
