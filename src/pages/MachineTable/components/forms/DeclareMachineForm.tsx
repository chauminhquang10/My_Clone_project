import { ModalForm } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useCallback, useMemo } from 'react';
import styles from './declareMachineForm.less';
import DeclareMachineStep from './DeclareMachineStep';
import Api from '@/services/STM-APIs';
import { openNotification } from '@/utils';

interface DeclareMachineFormProps extends API.StmDetailResponse {
  visible: boolean;
  onVisibleChange?: (value: boolean) => void;
  onCancel: () => void;
}

export default function DeclareMachineForm({
  visible,
  onVisibleChange,
  onCancel,
  ...machineDetail
}: DeclareMachineFormProps) {
  const [form] = Form.useForm();
  if (machineDetail) {
    const defaultUpdateBody: API.UpdateStmRequest = {
      accountingAccountVND: machineDetail.accountingAccountVND!,
      acquirerId: machineDetail.acquirerId!,
      address: machineDetail.address!,
      denominationRule: machineDetail.denominationRule!,
      districtId: machineDetail.district?.id || 0,
      ipAddress: machineDetail.ipAddress!,
      keyType: machineDetail.keyType!,
      location: machineDetail.location!,
      mac: machineDetail.mac!,
      machineName: machineDetail.name!,
      machineType: machineDetail.machineType!,
      masterKey: machineDetail.masterKey!,
      modelId: machineDetail.model?.id || 0,
      port: machineDetail.port!,
      protocol: machineDetail.protocol!,
      provinceId: machineDetail.province?.id || 0,
      serialNumber: machineDetail.serialNumber!,
      terminalId: machineDetail.terminalId!,
      wardId: machineDetail.ward?.id || 0,
      accountingAccountUSD: machineDetail.accountingAccountUSD,
      denominations: machineDetail.denominations,
      latitude: machineDetail.latitude,
      longitude: machineDetail.longitude,
      managementUnitId: machineDetail.managementUnit?.id,
      note: '',
      userIds: machineDetail.managementUsers?.map((user) => user.id!),
    };
    form.setFieldsValue(defaultUpdateBody);
  }
  const modalProps = useMemo(
    () => ({
      centered: true,
      closable: false,
      destroyOnClose: true,
      className: styles.myModalForm,
    }),
    [],
  );

  const handleFinish = useCallback(
    async (values) => {
      try {
        const res = await Api.STMController.updateMachine(
          { id: machineDetail.id! },
          {
            ...machineDetail,
            ...values,
            machineName: machineDetail.name,
            districtId: machineDetail.district?.id,
            provinceId: machineDetail.province?.id,
            wardId: machineDetail.ward?.id,
          },
        );

        if (res.code === 1) {
          openNotification('error', 'Cập nhật thông tin thiết bị thất bại', res.message);
        }

        if (res.code === 0) {
          openNotification('success', 'Cập nhật thông tin thiết bị thành công');
        }
      } catch (e) {
        openNotification('error', 'Cập nhật thông tin thiết bị thất bại');
      }
      return true;
    },
    [machineDetail],
  );

  return (
    <ModalForm
      form={form}
      width="934px"
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={handleFinish}
      modalProps={modalProps}
      submitTimeout={2000}
    >
      <DeclareMachineStep form={form} onCancel={onCancel} {...machineDetail} />
    </ModalForm>
  );
}
