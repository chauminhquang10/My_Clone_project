import { CloseIcon } from '@/assets';
import { DenominationRule, KeyType, MachineType, Protocol } from '@/common';
import Api from '@/services/STM-APIs';
import { checkFormFieldsEmpty, objectKeys } from '@/utils';
import { useRequest } from 'ahooks';
import type { FormInstance } from 'antd';
import { InputNumber } from 'antd';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import type { ChangeEventHandler, ReactNode } from 'react';
import { useMemo } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import styles from './declareMachineForm.less';

interface DeclareMachineStepProps extends API.StmDetailResponse {
  onCancel: () => void;
  onSubmit?: () => void;
  form: FormInstance;
  submitButtonLabel?: ReactNode;
  cancelButtonLabel?: ReactNode;
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
  submitButtonLabel = <FormattedMessage id="form_buttonGroup_saveButton_title" />,
  cancelButtonLabel = <FormattedMessage id="form_buttonGroup_cancelButton_title" />,
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
  const intl = useIntl();
  const [mType, setMType] = useState<MachineType>(() => {
    const result = (machineType as MachineType) ?? MachineType.STM;
    form.setFieldValue('machineType', result);
    return result;
  });
  const { data: models } = useRequest(getModels(mType), {
    cacheKey: `models-${mType}`,
    refreshDeps: [mType],
  });
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

  const handleSelectMachineType = useCallback(
    (type: string) => {
      form.setFieldValue('modelId', undefined);
      setMType(type as MachineType);
    },
    [form],
  );

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

  return (
    <>
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>
          <p className={styles.modalTitle}>
            <FormattedMessage id="declare-machine.title" />
          </p>
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
            label={<FormattedMessage id="machineType" />}
            rules={[{ enum: ['UNKNOWN', 'STM', 'CDM', 'ATM'], max: 6, type: 'string' }]}
          >
            <Select
              defaultValue={mType}
              onSelect={handleSelectMachineType}
              placeholder={<FormattedMessage id="machineType" />}
              defaultActiveFirstOption
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
          <Form.Item
            name="modelId"
            label={<FormattedMessage id="model" />}
            rules={[{ type: 'number' }]}
          >
            <Select
              defaultValue={machineDetail.model?.id}
              placeholder={<FormattedMessage id="model" />}
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
            label={<FormattedMessage id="declare-machine.series" />}
            help={
              serialErr ? intl.formatMessage({ id: 'declare-machine.invalid-series' }) : undefined
            }
            validateStatus={serialErr ? 'error' : undefined}
            rules={[{ min: 0, max: 100, type: 'string' }]}
          >
            <Input
              onChange={handleSerialChange}
              onBlur={serialVal === machineDetail.serialNumber ? undefined : validateSerial}
              defaultValue={machineDetail.serialNumber}
              placeholder={intl.formatMessage({ id: 'declare-machine.series' })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="keyType"
            label={<FormattedMessage id="declare-machine.keyType" />}
            rules={[{ type: 'string', max: 10 }]}
          >
            <Select
              defaultValue={machineDetail.keyType}
              placeholder={<FormattedMessage id="declare-machine.keyType" />}
            >
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
            label={<FormattedMessage id="terminalId" />}
            help={
              terminalErr
                ? intl.formatMessage({ id: 'declare-machine.invalid-terminal' })
                : undefined
            }
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
            label={<FormattedMessage id="ipAddress" />}
            help={ipErr ? intl.formatMessage({ id: 'declare-machine.invalid-ip' }) : undefined}
            validateStatus={ipErr ? 'error' : undefined}
            rules={[{ type: 'string', min: 1, max: 100 }]}
          >
            <Input
              onChange={handleIpChange}
              onBlur={ipVal !== machineDetail.ipAddress ? validateIp : undefined}
              defaultValue={machineDetail.ipAddress}
              placeholder={intl.formatMessage({ id: 'ipAddress' })}
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
            label={<FormattedMessage id="declare-machine.port" />}
            rules={[{ type: 'number', min: 1, max: 65535 }]}
          >
            <InputNumber
              controls={false}
              defaultValue={machineDetail.port}
              placeholder={intl.formatMessage({ id: 'declare-machine.port' })}
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
            <Select defaultValue={machineDetail.protocol} placeholder={'Protocol'}>
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
            help={macErr ? intl.formatMessage({ id: 'declare-machine.invalid-mac' }) : undefined}
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
            label={<FormattedMessage id="declare-machine.accountingUSD" />}
            rules={[{ type: 'string', min: 0, max: 100 }]}
          >
            <Input
              defaultValue={machineDetail.accountingAccountUSD}
              placeholder={intl.formatMessage({ id: 'declare-machine.accountingUSD' })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            validateTrigger="onBlur"
            name="accountingAccountVND"
            label={<FormattedMessage id="declare-machine.accountingVND" />}
            rules={[{ type: 'string', min: 0, max: 100 }]}
          >
            <Input
              defaultValue={machineDetail.accountingAccountVND}
              placeholder={intl.formatMessage({ id: 'declare-machine.accountingVND' })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            validateTrigger="onBlur"
            name="denominationRule"
            label={<FormattedMessage id="declare-machine.denominationRule" />}
            rules={[{ type: 'string', max: 20 }]}
          >
            <Select
              defaultValue={machineDetail.denominationRule}
              placeholder={intl.formatMessage({ id: 'declare-machine.denominationRule' })}
            >
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
            label={<FormattedMessage id="declare-machine.denominations" />}
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
