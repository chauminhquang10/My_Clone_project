import Api from '@/services/STM-APIs';
import { openNotification } from '@/utils';
import { ModalForm, ModalFormProps } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useCallback, useMemo } from 'react';
import { useIntl } from 'umi';
import DeclareUnitStep from './DeclareUnitStep';
import styles from './editMachine.less';

interface DeclareUnitFormProps extends API.StmDetailResponse {
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
  onCancel: () => void;
  getAllMachine: () => void;
  handleClose: () => void;
}

export default function DeclareUnitForm({
  visible,
  onVisibleChange,
  onCancel,
  handleClose,
  getAllMachine,
  ...machineDetail
}: DeclareUnitFormProps) {
  const [form] = Form.useForm();
  const intl = useIntl();
  const modalProps: ModalFormProps['modalProps'] = useMemo(
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
            provinceId: machineDetail.province?.id,
            districtId: machineDetail.district?.id,
            wardId: machineDetail.ward?.id,
            modelId: machineDetail.model?.id,
            port: machineDetail.port,
          },
        );

        if (res.code !== 0) {
          openNotification(
            'error',
            intl.formatMessage({ defaultMessage: res.message, id: `error.${res.code}` }),
          );

          return false;
        }

        openNotification('success', 'Cập nhật thông tin thiết bị thành công');
        getAllMachine();

        onVisibleChange(false);
        handleClose();
        return true;
      } catch (e) {
        openNotification('error', 'Cập nhật thông tin thiết bị thất bại');
      }

      return false;
    },
    [machineDetail, handleClose, onVisibleChange, intl, getAllMachine],
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
      onVisibleChange={onVisibleChange}
    >
      <DeclareUnitStep form={form} onCancel={onCancel} {...machineDetail} />
    </ModalForm>
  );
}
