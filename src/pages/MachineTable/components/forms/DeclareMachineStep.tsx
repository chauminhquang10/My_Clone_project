import { CloseIcon } from '@/assets';
import { DenominationRule, KeyType, MachineType, Protocol } from '@/common';
import Api from '@/services/STM-APIs';
import { checkFormFieldsEmpty, objectKeys } from '@/utils';
import { useRequest } from 'ahooks';
import type { FormInstance } from 'antd';
import { InputNumber } from 'antd';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import type { ChangeEventHandler } from 'react';
import { useMemo } from 'react';
import { useCallback, useEffect, useState } from 'react';
import styles from './declareMachineForm.less';

interface DeclareMachineStepProps extends API.StmDetailResponse {
  onCancel: () => void;
  onSubmit?: () => void;
  form: FormInstance;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
}

const validateMachine = (params: API.checkMachineExistedParams) => () =>
  Api.STMController.checkMachineExisted(params).then((res) => res.data?.existed);

const getModels = (machineType: MachineType) => () =>
  Api.STMModelController.getListModels({ machineType }).then((res) => res.data?.items);

const getDenominations = () =>
  Api.DenominationsController.getListDenominations().then(
    (res: API.ResponseBaseListDenominationsResponse) =>
      res.data?.denominations?.map((denomination) => denomination.value),
  );

export default function DeclareMachineStep({
  onCancel: handleCancel,
  onSubmit,
  form,
  submitButtonLabel = 'Lưu',
  cancelButtonLabel = 'Huỷ bỏ',
  machineType,
  model,
  serialNumber,
  keyType,
  terminalId,
  ipAddress,
  acquirerId,
  port,
  masterKey,
  protocol,
  mac,
  accountingAccountUSD,
  accountingAccountVND,
  denominationRule,
  denominations: denominationsDetail,
}: DeclareMachineStepProps) {
  const { data: models } = useRequest(getModels(MachineType.STM));
  const { data: denominationsData } = useRequest(getDenominations, {
    cacheKey: 'denominations',
    ready: !denominationsDetail,
  });
  const denominations = useMemo(
    () => denominationsDetail ?? denominationsData,
    [denominationsDetail, denominationsData],
  );
  const [terminalIdValue, setTerminalIdValue] = useState<string>('');
  const [ipVal, setIpVal] = useState<string>('');
  const [macVal, setMacVal] = useState<string>('');
  const [serialVal, setSerialVal] = useState<string>('');
  const [disabledModel, setDisabledModel] = useState(true);
  const { run: validateTerminalId, data: terminalErr } = useRequest(
    validateMachine({ key: 'terminal', value: terminalIdValue || '' }),
    {
      ready: terminalIdValue !== undefined,
      manual: true,
    },
  );
  const { run: validateIp, data: ipErr } = useRequest(
    validateMachine({ key: 'ip', value: ipVal || '' }),
  );
  const { run: validateMAC, data: macErr } = useRequest(
    validateMachine({ key: 'mac', value: macVal || '' }),
  );
  const { run: validateSerial, data: serialErr } = useRequest(
    validateMachine({ key: 'serial', value: serialVal || '' }),
  );

  const machineDetail = {
    machineType,
    model,
    serialNumber,
    keyType,
    terminalId,
    ipAddress,
    acquirerId,
    port,
    masterKey,
    protocol,
    mac,
    accountingAccountUSD,
    accountingAccountVND,
    denominationRule,
    denominationsDetail,
  };

  const handleTerminalIdChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setTerminalIdValue(e.target.value),
    [],
  );
  const handleIpChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setIpVal(e.target.value),
    [],
  );
  const handleMACChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setMacVal(e.target.value),
    [],
  );
  const handleSerialChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setSerialVal(e.target.value),
    [],
  );

  const handleSelectMachineType = useCallback(() => setDisabledModel(false), []);

  const OkButton = useCallback(() => {
    const fields = form.getFieldsValue();

    const disabledNextBtn =
      checkFormFieldsEmpty(fields) || serialErr || terminalErr || ipErr || macErr;

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
  }, [form, onSubmit, submitButtonLabel, serialErr, terminalErr, ipErr, macErr]);

  useEffect(() => {
    if (denominations) {
      form.setFieldValue(
        'denominations',
        denominations.map((denomination) => denomination),
      );
    }
  }, [denominations, form]);
  console.log(disabledModel);

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
            validateTrigger="onBlur"
            name="machineType"
            label="Loại máy"
            rules={[{ enum: ['UNKNOWN', 'STM', 'CDM', 'ATM'], max: 6, type: 'string' }]}
          >
            <Select
              defaultValue={machineDetail.machineType}
              onSelect={handleSelectMachineType}
              placeholder={'Loại máy'}
            >
              {objectKeys(MachineType).map((type) => (
                <Select.Option value={type} key={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="modelId" label="Dòng máy" rules={[{ type: 'number' }]}>
            <Select
              defaultValue={machineDetail.model?.id}
              placeholder={'Dòng máy'}
              disabled={disabledModel}
            >
              {models?.map((modelItem) => (
                <Select.Option value={modelItem.id} key={modelItem.id}>
                  {modelItem.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            validateTrigger="onBlur"
            name="serialNumber"
            label="Series máy"
            help={serialErr ? 'Series máy đã tồn tại. Vui lòng kiểm tra lại' : undefined}
            validateStatus={serialErr ? 'error' : undefined}
            rules={[{ min: 0, max: 100, type: 'string' }]}
          >
            <Input
              onChange={handleSerialChange}
              onBlur={serialVal === machineDetail.serialNumber ? undefined : validateSerial}
              defaultValue={machineDetail.serialNumber}
              placeholder={'Series máy'}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="keyType" label="Loại khoá" rules={[{ type: 'string', max: 10 }]}>
            <Select defaultValue={machineDetail.keyType} placeholder={'Loại khoá'}>
              {objectKeys(KeyType).map((keyTypeItem) => (
                <Select.Option key={keyTypeItem}>{keyTypeItem}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            validateTrigger="onBlur"
            name="terminalId"
            label="Terminal ID"
            help={terminalErr ? 'Series máy đã tồn tại. Vui lòng kiểm tra lại' : undefined}
            validateStatus={terminalErr ? 'error' : undefined}
            rules={[{ type: 'string', min: 0, max: 100 }]}
          >
            <Input
              value={terminalIdValue}
              onChange={handleTerminalIdChange}
              onBlur={terminalIdValue === machineDetail.terminalId ? undefined : validateTerminalId}
              defaultValue={machineDetail.terminalId}
              placeholder={'Terminal ID'}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            validateTrigger="onBlur"
            name="ipAddress"
            label="Địa chỉ IP"
            help={ipErr ? 'Địa chỉ IP đã tồn tại. Vui lòng kiểm tra lại' : undefined}
            validateStatus={ipErr ? 'error' : undefined}
            rules={[{ type: 'string', min: 1, max: 100, required: true }]}
          >
            <Input
              onChange={handleIpChange}
              onBlur={ipVal !== machineDetail.ipAddress ? validateIp : undefined}
              defaultValue={machineDetail.ipAddress}
              placeholder={'Địa chỉ IP'}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            validateTrigger="onBlur"
            name="acquirerId"
            label="Acquirer ID"
            rules={[{ type: 'string', min: 0, max: 100 }]}
          >
            <Input defaultValue={machineDetail.acquirerId} placeholder={'Acquirer ID'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            validateTrigger="onBlur"
            name="port"
            label="Cổng"
            rules={[{ type: 'number', min: 1, max: 65535 }]}
          >
            <InputNumber
              controls={false}
              defaultValue={machineDetail.port}
              placeholder={'Cổng'}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            validateTrigger="onBlur"
            name="masterKey"
            label="Master (A)/(B) Key"
            rules={[{ type: 'string', len: 32, max: 32 }]}
          >
            <Input defaultValue={machineDetail.masterKey} placeholder={'Master (A)/(B) Key'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="protocol" label="Protocol" rules={[{ type: 'string', max: 10 }]}>
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
          <Form.Item
            validateTrigger="onBlur"
            name="mac"
            label="MAC"
            help={macErr ? 'Địa chỉ MAC đã tồn tại. Vui lòng kiểm tra lại' : undefined}
            validateStatus={macErr ? 'error' : undefined}
            rules={[{ type: 'string', min: 0, max: 100 }]}
          >
            <Input
              onChange={handleMACChange}
              onBlur={macVal === machineDetail.mac ? undefined : validateMAC}
              defaultValue={machineDetail.mac}
              placeholder={'MAC'}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            validateTrigger="onBlur"
            name="accountingAccountUSD"
            label="Tài khoản hạch toán - USD"
            rules={[{ type: 'string', min: 0, max: 100 }]}
          >
            <Input
              defaultValue={machineDetail.accountingAccountUSD}
              placeholder={'Tài khoản hạch toán - USD'}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            validateTrigger="onBlur"
            name="accountingAccountVND"
            label="Tài khoản hạch toán - VNĐ"
            rules={[{ type: 'string', min: 0, max: 100 }]}
          >
            <Input
              defaultValue={machineDetail.accountingAccountVND}
              placeholder={'Tài khoản hạch toán - VNĐ'}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            validateTrigger="onBlur"
            name="denominationRule"
            label="Quy tắc chi tiền"
            rules={[{ type: 'string', max: 20 }]}
          >
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
            rules={[{ type: 'array' }]}
            initialValue={[50000, 100000, 200000, 500000]}
          >
            <Row gutter={12}>
              {denominations?.map((denomination) => {
                return (
                  <Col span={24 / denominations.length} key={denomination}>
                    <Input disabled value={`${denomination}`} />
                  </Col>
                );
              })}
            </Row>
          </Form.Item>
        </Col>
      </Row>
      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button className={styles.cancelButton} size="large" onClick={handleCancel}>
          {cancelButtonLabel}
        </Button>
        <Form.Item shouldUpdate>{OkButton}</Form.Item>
      </Row>
    </>
  );
}
