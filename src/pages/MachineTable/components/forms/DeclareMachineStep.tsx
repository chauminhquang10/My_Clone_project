import { CloseIcon } from '@/assets';
import { DenominationRule, KeyType, MachineType, Protocol } from '@/common';
import Api from '@/services/STM-APIs';
import { objectKeys } from '@/utils';
import { useRequest } from 'ahooks';
import { Button, Col, Form, FormInstance, Input, Row, Select } from 'antd';
import { useEffect } from 'react';
import styles from './declareMachineForm.less';

interface DeclareMachineStepProps {
  onCancel: () => void;
  onOk: () => void;
  form: FormInstance;
}

const getModels = (machineType: MachineType) => () =>
  Api.STMModelController.getListModels({ machineType }).then((res) => res.data?.models);

const getDenominations: () => Promise<API.Denomination[] | undefined> = () =>
  Api.DenominationsController.getListDenominations().then(
    (res: API.ResponseBaseListDenominationsResponse) => res.data?.denominations,
  );

export default function DeclareMachineStep({
  onCancel: handleCancel,
  onOk,
  form,
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
  }, [denominations]);

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
            <Select placeholder="Loại máy">
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
            <Select placeholder="Dòng máy">
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
            <Input placeholder="Series máy" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="keyType" label="Loại khoá">
            <Select placeholder="Loại khoá">
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
            <Input placeholder="Terminal ID" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="ipAddress"
            label="Địa chỉ IP"
            rules={[{ required: true, message: 'Địa chỉ IP không được để trống' }]}
          >
            <Input placeholder="Địa chỉ IP" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="acquirerId" label="Acquirer ID">
            <Input placeholder={'Acquirer ID'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="gate" label="Cổng">
            <Input placeholder={'Cổng'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="masterKey"
            label="Master (A)/(B) Key"
            rules={[{ required: true, message: 'MasterKey không được để trống' }]}
          >
            <Input placeholder={'Master (A)/(B) Key'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="protocol" label="Protocol">
            <Select placeholder="Loại khoá">
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
            <Input placeholder={'example'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="accountingAccountUSD" label="Tài khoản hạch toán - USD">
            <Input placeholder="Tài khoản hạch toán - USD" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="accountingAccountVND" label="Tài khoản hạch toán - VNĐ">
            <Input placeholder="Tài khoản hạch toán - VNĐ" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="denominationRule" label="Quy tắc chi tiền">
            <Select placeholder="Quy tắc chi tiền">
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
          Huỷ bỏ
        </Button>
        <Form.Item shouldUpdate>
          {() => {
            const test = form.getFieldsValue();
            const disabledNextBtn = objectKeys(test).some((key) => !test[key]);

            return (
              <Button
                className={styles.submitButton}
                size="large"
                htmlType="submit"
                onClick={onOk}
                disabled={disabledNextBtn}
              >
                Tiếp tục
              </Button>
            );
          }}
        </Form.Item>
      </Row>
    </>
  );
}
