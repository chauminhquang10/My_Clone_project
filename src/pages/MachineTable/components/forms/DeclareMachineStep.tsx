import { CloseIcon } from '@/assets';
import { DenominationRule, KeyType, MachineType, Protocol } from '@/common';
import Api from '@/services/STM-APIs';
import { objectKeys } from '@/utils';
import { useRequest } from 'ahooks';
import type { FormInstance } from 'antd';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useEffect } from 'react';
import styles from './declareMachineForm.less';

interface DeclareMachineStepProps extends API.StmDetailResponse {
  onCancel: () => void;
  onSubmit?: () => void;
  form: FormInstance;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
}

const NextButton = ({
  form,
  submitButtonLabel,
  onSubmit,
}: {
  form: FormInstance;
  submitButtonLabel: string;
  onSubmit?: () => void;
}) => {
  const fields = form.getFieldsValue();
  console.log({ fields });

  const disabledNextBtn = objectKeys(fields).some((key) => !fields[key]);
  console.log({ disabledNextBtn });

  return (
    <Button
      className={styles.submitButton}
      size="large"
      htmlType="submit"
      onClick={onSubmit}
      disabled={disabledNextBtn}
    >
      {submitButtonLabel}
    </Button>
  );
};

const getModels = (machineType: MachineType) => () =>
  Api.STMModelController.getListModels({ machineType }).then((res) => res.data?.models);

const getDenominations: () => Promise<API.Denomination[] | undefined> = () =>
  Api.DenominationsController.getListDenominations().then(
    (res: API.ResponseBaseListDenominationsResponse) => res.data?.denominations,
  );

export default function DeclareMachineStep({
  onCancel: handleCancel,
  onSubmit,
  form,
  submitButtonLabel = 'Lưu',
  cancelButtonLabel = 'Huỷ bỏ',
  ...machineDetail
}: DeclareMachineStepProps) {
  const { data: models } = useRequest(getModels(MachineType.STM));
  const { data: denominations } = useRequest(getDenominations, { cacheKey: 'denominations' });

  useEffect(() => {
    if (denominations) {
      form.setFieldValue(
        'denominations',
        denominations.map((denomination) => denomination.value),
      );
    }
  }, [denominations, form]);

  return (
    <>
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>
          <p className={styles.modalTitle}>Khai báo thiết bị</p>
        </Col>
        <Col>
          <span className={styles.closeIcon} onClick={handleCancel}>
            <img src={CloseIcon} />
          </span>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Form.Item
            name="machineType"
            label="Loại máy"
            rules={[{ required: true, message: 'Loại máy không được để trống' }]}
          >
            <Select defaultValue={machineDetail.machineType} placeholder={'Loại máy'}>
              {objectKeys(MachineType).map((type) => (
                <Select.Option value={type} key={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="modelId"
            label="Dòng máy"
            rules={[{ required: true, message: 'Dòng máy không được để trống' }]}
          >
            <Select defaultValue={machineDetail.model?.id} placeholder={'Dòng máy'}>
              {models?.map((model) => (
                <Select.Option value={model.id} key={model.id}>
                  {model.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="serialNumber"
            label="Series máy"
            rules={[{ required: true, message: 'Series máy không được để trống' }]}
          >
            <Input defaultValue={machineDetail.serialNumber} placeholder={'Series máy'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="keyType" label="Loại khoá">
            <Select defaultValue={machineDetail.keyType} placeholder={'Loại khoá'}>
              {objectKeys(KeyType).map((keyType) => (
                <Select.Option key={keyType}>{keyType}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="terminalId"
            label="Terminal ID"
            rules={[{ required: true, message: 'Terminal ID không được để trống' }]}
          >
            <Input defaultValue={machineDetail.terminalId} placeholder={'Terminal ID'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="ipAddress"
            label="Địa chỉ IP"
            rules={[{ required: true, message: 'Địa chỉ IP không được để trống' }]}
          >
            <Input defaultValue={machineDetail.ipAddress} placeholder={'Địa chỉ IP'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="acquirerId" label="Acquirer ID">
            <Input defaultValue={machineDetail.acquirerId} placeholder={'Acquirer ID'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="port" label="Cổng">
            <Input defaultValue={machineDetail.port} placeholder={'Cổng'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="masterKey"
            label="Master (A)/(B) Key"
            rules={[{ required: true, message: 'MasterKey không được để trống' }]}
          >
            <Input defaultValue={machineDetail.masterKey} placeholder={'Master (A)/(B) Key'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="protocol" label="Protocol">
            <Select defaultValue={machineDetail.protocol} placeholder={'Loại khoá'}>
              {objectKeys(Protocol).map((item) => (
                <Select.Option value={item} key={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="mac" label="MAC">
            <Input defaultValue={machineDetail.mac} placeholder={'MAC'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="accountingAccountUSD" label="Tài khoản hạch toán - USD">
            <Input
              defaultValue={machineDetail.accountingAccountUSD}
              placeholder={'Tài khoản hạch toán - USD'}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="accountingAccountVND" label="Tài khoản hạch toán - VNĐ">
            <Input
              defaultValue={machineDetail.accountingAccountVND}
              placeholder={'Tài khoản hạch toán - VNĐ'}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="denominationRule" label="Quy tắc chi tiền">
            <Select defaultValue={machineDetail.denominationRule} placeholder={'Quy tắc chi tiền'}>
              {objectKeys(DenominationRule).map((rule) => (
                <Select.Option key={rule} value={DenominationRule[rule]}>
                  {rule}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="denominations"
            label="Loại mệnh giá tiền"
            rules={[{ required: true, message: 'Loại mệnh giá tiền không được để trống' }]}
          >
            <Row gutter={12}>
              {denominations?.map((denomination) => (
                <Col span={24 / denominations.length} key={denomination.id}>
                  <Input disabled value={`${denomination.value}`} />
                </Col>
              ))}
            </Row>
          </Form.Item>
        </Col>
      </Row>
      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button className={styles.cancelButton} size="large" onClick={handleCancel}>
          {cancelButtonLabel}
        </Button>
        <Form.Item shouldUpdate>
          {!machineDetail && (
            <NextButton form={form} onSubmit={onSubmit} submitButtonLabel={submitButtonLabel} />
          )}
          {machineDetail && (
            <Button
              className={styles.submitButton}
              size="large"
              htmlType="submit"
              onClick={onSubmit}
            >
              {submitButtonLabel}
            </Button>
          )}
        </Form.Item>
      </Row>
    </>
  );
}
