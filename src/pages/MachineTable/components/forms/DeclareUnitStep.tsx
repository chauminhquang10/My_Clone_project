import { CloseIcon } from '@/assets';
import LocationFields from '@/pages/UnitTable/components/LocationFields';
import Api from '@/services/STM-APIs';
import { checkFormFieldsEmpty, objectKeys } from '@/utils';
import { useDebounce, useInfiniteScroll, useRequest } from 'ahooks';
import { Avatar, FormInstance, Space } from 'antd';
import { AutoComplete, Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { ChangeEventHandler, ReactNode, useMemo } from 'react';
import { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import Map from '../map/Map';
import StaffList from '../tables/StaffList';
import DropdownOverlay from './DropdownOverlay';
import styles from './editMachine.less';

interface DeclareUnitStepProps<T> extends API.StmDetailResponse {
  onCancel: () => void;
  onPrevious?: () => void;
  form: FormInstance<T>;
  submitButtonLabel?: ReactNode;
  onSubmit?: () => void;
  cancelButtonLabel?: ReactNode;
}

interface UserResult {
  list: API.UserResponse[];
  total: number | undefined;
  isReachingEnd: boolean | undefined;
}

const getAllUnit = () =>
  Api.ManagementUnitController.getAllManagementUnits({}).then(
    (res: API.ResponseBasePageResponseManagementUnitResponse) => res.data?.items,
  );

const getUsers =
  (query: string | undefined) =>
  (pageNumber: number, pageSize: number): Promise<UserResult> => {
    return Api.UserController.getAllUsers({ pageNumber, pageSize, query, status: 'ACTIVE' }).then(
      (res) => ({
        total: res.data?.totalSize,
        list: res.data?.items || [],
        isReachingEnd:
          res.data?.items?.length === 0 ||
          (res.data?.items?.length !== undefined && res.data.items.length < pageSize),
      }),
    );
  };

const getAddressData = (address?: string, city?: string, district?: string, ward?: string) => () =>
  fetch(
    `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&outFields=ShortLabel&forStorage=false&Address=${address}, ${ward}, ${district}&City=${city}&CountryCode=VN`,
  )
    .then((res) => res.json())
    .then((res: AddressDataResponse) => res.candidates);

interface Candidate {
  address: string;
  score: number;
  location: { x: number; y: number };
  attributes: { ShortLabel: string };
  extent: { xmin: number; ymin: number; xmax: number; ymax: number };
}

interface AddressDataResponse {
  spatialReference: {
    wkid: number;
    latestWkid: number;
  };
  candidates: Candidate[];
}

const PAGE_SIZE = 10;

export default function DeclareUnitStep<T>({
  onCancel,
  onSubmit,
  onPrevious,
  form,
  submitButtonLabel = <FormattedMessage id="form_buttonGroup_saveButton_title" />,
  cancelButtonLabel = <FormattedMessage id="form_buttonGroup_cancelButton_title" />,
  ...machineDetail
}: DeclareUnitStepProps<T>) {
  const intl = useIntl();
  const { data: unitList, loading: unitListLoading } = useRequest(getAllUnit);
  const [query, setQuery] = useState<string>();
  const queryDebounced = useDebounce(query, { wait: 400 });
  const { data: usersData, loadMore } = useInfiniteScroll(
    (d) => {
      const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 0;
      return getUsers(query)(page, PAGE_SIZE);
    },
    { reloadDeps: [queryDebounced] },
  );
  // const [machineName, setMachineName] = useState<string>();
  // const debouncedMachineName = useDebounce(machineName, { wait: 500 });
  const [address, setAddress] = useState<string>();
  const debounceAddress = useDebounce(address, { wait: 500 });
  const [province, setProvince] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [ward, setWard] = useState<string>();
  const [coordinate, setCoordinate] = useState<[number, number]>(() =>
    machineDetail
      ? [machineDetail.latitude || 14.058324, machineDetail.longitude || 108.277199]
      : [14.058324, 108.277199],
  );
  const { data: addressData } = useRequest(
    getAddressData(debounceAddress, province, district, ward),
    {
      ready: !!debounceAddress && !!province && !!district && !!ward,
      refreshDeps: [debounceAddress, province, district, ward],
    },
  );
  // const { data: machineNameError } = useRequest(
  //   () =>
  //     Api.STMController.checkMachineExisted({ key: 'name', value: debounceAddress! }).then(
  //       (res) => res.data?.existed,
  //     ),
  //   { cacheKey: `machineName-${machineName}`, ready: !!machineName, debounceWait: 500 },
  // );
  // console.log({ machineNameError, machineName, debouncedMachineName });

  const disabledAddress =
    !form.getFieldValue('provinceId') ||
    !form.getFieldValue('districtId') ||
    !form.getFieldValue('wardId');
  const onSearch = useCallback((searchText: string) => {
    setAddress(searchText);
  }, []);

  const handleSelectAddress = useCallback(
    (data: string) => {
      const shortLabel = addressData?.find((addr) => addr.attributes.ShortLabel === data);

      if (!shortLabel) throw Error(`Address should not be ${shortLabel}`);

      setCoordinate([shortLabel.location.y, shortLabel.location.x]);
    },
    [addressData],
  );

  const handleStaffSearchChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const getPopupContainer = useCallback((trigger) => trigger.parentNode, []);

  const handleChangeUnitId = useCallback(
    async (id: number) => {
      if (unitList) {
        form.setFieldValue('managementUnitId', id);
        form.setFieldValue('unitAddress', unitList.find((el) => el.id === id)?.address);
      }
    },
    [unitList, form],
  );

  const handlePrevious = useCallback(() => {
    const values = form.getFieldsValue();
    objectKeys(values as Record<string, string>).forEach((key) =>
      form.setFieldValue(key, undefined),
    );
    if (onPrevious) onPrevious();
  }, [onPrevious, form]);

  const handleClearUser = useCallback(() => {
    form.setFieldValue('userIds', []);
  }, [form]);

  const OkButton = useCallback(() => {
    const fields = form.getFieldsValue();
    const disableOkButton = checkFormFieldsEmpty(fields as Record<string, string | undefined>);

    return (
      <Button
        className={styles.submitButton}
        htmlType="submit"
        size="large"
        onClick={onSubmit}
        disabled={disableOkButton}
      >
        {submitButtonLabel}
      </Button>
    );
  }, [form, submitButtonLabel, onSubmit]);

  // const handleMachineNameChange = useCallback((e) => {
  //   setMachineName(e.target.value);
  // }, []);

  if (machineDetail.managementUnit && !form.isFieldTouched('managementUnitId')) {
    form.setFieldValue('unitAddress', machineDetail.managementUnit.address);
  }

  const machineNameHelp = useMemo(() => undefined, []);
  const machineNameValidateStatus = useMemo(() => undefined, []);

  return (
    <>
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>
          <p className={styles.modalTitle}>
            <FormattedMessage id="declare-unit.title" />
          </p>
        </Col>
        <Col>
          <span className={styles.closeIcon} onClick={onCancel}>
            <img src={CloseIcon} />
          </span>
        </Col>
      </Row>

      <div className={styles.formBody} id="test">
        <Card
          title={<FormattedMessage id="menu.user-management.management-unit" />}
          size="small"
          className={styles.myCard}
          style={{ borderRadius: 12 }}
        >
          <Row gutter={24} align="bottom" style={{ marginBottom: 24 }}>
            <Col span={12}>
              <Form.Item
                name="managementUnitId"
                label={<FormattedMessage id="machine-drawer.code-unitName" />}
              >
                <Select
                  onChange={handleChangeUnitId}
                  placeholder={<FormattedMessage id="machine-drawer.code-unitName" />}
                  loading={unitListLoading}
                  getPopupContainer={getPopupContainer}
                >
                  {unitList?.map((unit) => (
                    <Select.Option key={unit.id} value={unit.id}>
                      {`${unit.id} - ${unit.name}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="unitAddress" label={<FormattedMessage id="address" />}>
                <Input disabled placeholder={form.getFieldValue('unitAddress')} />
              </Form.Item>
            </Col>
            <Col span={24} style={{ marginTop: 24, marginBottom: 24 }}>
              <Form.Item
                name="userIds"
                label={<FormattedMessage id="machine-drawer.code-staffName" />}
              >
                <Select
                  loading={unitListLoading}
                  onClear={handleClearUser}
                  mode="multiple"
                  maxTagCount={4}
                  maxTagTextLength={20}
                  getPopupContainer={getPopupContainer}
                  dropdownRender={(menu) => (
                    <DropdownOverlay
                      query={query}
                      disabledLoadMore={usersData?.isReachingEnd}
                      menu={menu}
                      onLoadMore={loadMore}
                      onChange={handleStaffSearchChange}
                    />
                  )}
                  optionLabelProp="label"
                  allowClear
                >
                  {usersData?.list?.map((user) => (
                    <Select.Option
                      value={user.id}
                      label={`${user.staffId} - ${user.name}`}
                      key={user.id}
                    >
                      <Space size={8}>
                        <Avatar src={user.avatar} />
                        {`${user.staffId} - ${user.name}`}
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={<FormattedMessage id="declare-unit.tableTitle" />} shouldUpdate>
                {() => {
                  return <StaffList form={form} />;
                }}
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card
          title={<FormattedMessage id="address" />}
          size="small"
          style={{ borderRadius: 12, marginTop: 24 }}
        >
          <Row gutter={[24, 24]} align="bottom">
            <LocationFields
              onSelectProvince={(_, options) => setProvince(options.children)}
              onSelectWard={(_, options) => setWard(options.children)}
              onSelectDistrict={(_, options) => setDistrict(options.children)}
              form={form}
              {...machineDetail}
            />
            <Col span={24}>
              <Form.Item
                name="address"
                label={<FormattedMessage id="Street name" />}
                rules={[{ type: 'string', min: 0, max: 100 }]}
                validateTrigger="onBlur"
              >
                <AutoComplete
                  placeholder={machineDetail.address ?? <FormattedMessage id="Street name" />}
                  options={addressData?.map((addr) => ({
                    value: addr.attributes.ShortLabel,
                  }))}
                  onSelect={handleSelectAddress}
                  onSearch={onSearch}
                  disabled={disabledAddress}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Map setPosition={setCoordinate} coordinate={coordinate} />
            </Col>
            <Col span={24}>
              <Form.Item
                name="machineName"
                label={<FormattedMessage id="machineName" />}
                rules={[
                  {
                    type: 'string',
                    min: 0,
                    max: 50,
                    pattern:
                      /^[a-z0-9A-Z\s_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/gu,
                    message: <FormattedMessage id="declare-machine.invalid-machineName" />,
                  },
                ]}
                help={machineNameHelp}
                validateStatus={machineNameValidateStatus}
              >
                <Input
                  // onChange={handleMachineNameChange}
                  placeholder={machineDetail.name ?? intl.formatMessage({ id: 'machineName' })}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </div>
      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button
          className={styles.cancelButton}
          size="large"
          onClick={onPrevious ? handlePrevious : onCancel}
        >
          {cancelButtonLabel}
        </Button>
        <Form.Item shouldUpdate>{OkButton}</Form.Item>
      </Row>
    </>
  );
}
