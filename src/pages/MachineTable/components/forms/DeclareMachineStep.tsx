import { CloseIcon } from '@/assets';
import { DenominationRule, KeyType, MachineType, Protocol } from '@/common';
import Api from '@/services/STM-APIs';
import { objectKeys } from '@/utils';
import { useRequest } from 'ahooks';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import styles from './declareMachineForm.less';

interface DeclareMachineStepProps {
  onCancel: () => void;
  onOk: () => void;
}

const getTotalMachine = (machineType: MachineType) => () =>
  Api.STMController.getListMachines({ machineType }).then((res) => res.data?.totalSize);

const getModels = (machineType: MachineType) => () =>
  Api.STMModelController.getListModels({ machineType }).then((res) => res.data?.models);

const getDenominations: () => Promise<API.Denomination[] | undefined> = () =>
  Api.DenominationsController.getListDenominations().then(
    (res: API.ResponseBaseListDenominationsResponse) => res.data?.denominations,
  );

export default function DeclareMachineStep({
  onCancel: handleCancel,
  onOk,
}: DeclareMachineStepProps) {
  const { data: machineCount } = useRequest(getTotalMachine(MachineType.ATM), { refreshDeps: [] });
  const { data: models } = useRequest(getModels(MachineType.STM));
  const { data: denominations } = useRequest(getDenominations);
  console.log({ denominations });

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
        <Col span={8}>
          <Form.Item name="stt" label="Số thứ tự">
            <Input placeholder={`${machineCount}`} disabled />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="machineType" label="Loại máy" valuePropName="">
            <Select placeholder="Loại máy">
              {objectKeys(MachineType).map((type) => (
                <Select.Option value={type} key={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="modelId" label="Dòng máy">
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
          <Form.Item name="serialNumber" label="Series máy">
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
          <Form.Item name="terminalId" label="Terminal ID">
            <Input placeholder="Terminal ID" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="ipAdress" label="Địa chỉ IP">
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
          <Form.Item name="masterKey" label="Master (A)/(B) Key">
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
            <Input placeholder="MAC" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="accountingAccountVND" label="Tài khoản hạch toán - VNĐ">
            <Input placeholder="MAC" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="denominationRule" label="Quy tắc chi tiền">
            <Select placeholder="Quy tắc chi tiền">
              {objectKeys(DenominationRule).map((rule) => (
                <Select.Option key={rule} value={rule}>
                  {rule}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="denominations" label="Loại mệnh giá tiền">
            <Row gutter={12}>
              {denominations?.map((denomination) => (
                <Col span={24 / denominations.length}>
                  <Input disabled placeholder={`${denomination.value}`} />
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
        <Button className={styles.submitButton} size="large" htmlType="submit" onClick={onOk}>
          Tiếp tục
        </Button>
      </Row>
    </>
  );
}
