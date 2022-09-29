import { CloseIcon } from '@/assets';
import LocationFields from '@/pages/UnitTable/components/LocationFields';
import Api from '@/services/STM-APIs';
import { checkFormFieldsEmpty, objectKeys } from '@/utils';
import { useDebounce, useRequest } from 'ahooks';
import type { FormInstance } from 'antd';
import { AutoComplete, Button, Card, Col, Form, Input, Row, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import Map from '../map/Map';
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

interface UserData extends API.UserResponse {
  index: number;
}

const userColumns: ColumnsType<Pick<UserData, 'name' | 'email' | 'phoneNumber'>> = [
  {
    title: <FormattedMessage id="tableColumn_indexTitle" />,
    align: 'center',
    dataIndex: 'index',
    width: '80px',
  },
  {
    title: (
      <div style={{ textAlign: 'center' }}>
        <FormattedMessage id="fullName" />
      </div>
    ),
    dataIndex: 'name',
    width: '307px',
  },
  {
    title: <div style={{ textAlign: 'center' }}>Email</div>,
    dataIndex: 'email',
    width: '307px',
  },
  {
    title: <FormattedMessage id="phoneNumber" />,
    dataIndex: 'phoneNumber',
    width: '140px',
  },
];

const getAllUnit = () =>
  Api.ManagementUnitController.getAllManagementUnits({}).then(
    (res: API.ResponseBasePageResponseManagementUnitResponse) => res.data?.items,
  );

const getUnit = (unitId: string) => () =>
  Api.ManagementUnitController.getManagementUnit({ unitId }).then((res) => res.data);

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
  const [uId, setUId] = useState<string>(`${machineDetail.managementUnit?.id}` ?? '');
  const { data: uDetails } = useRequest(getUnit(uId), {
    cacheKey: `${uId}`,
    refreshDeps: [uId],
    ready: uId !== '',
  });
  const [address, setAddress] = useState<string>();
  const debounceAddress = useDebounce(address, { wait: 500 });
  const [province, setProvince] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [ward, setWard] = useState<string>();
  const [users, setUsers] = useState<API.UserResponse[]>();
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
  const disabledAddress =
    !form.getFieldValue('provinceId') ||
    !form.getFieldValue('districtId') ||
    !form.getFieldValue('wardId');
  const disabledUserIds = !form.getFieldValue('managementUnitId');
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

  const handleChangeUnitId = useCallback(
    async (id: number) => {
      if (unitList) {
        form.setFieldValue('managementUnitId', id);
        form.setFieldValue('unitAddress', unitList.find((el) => el.id === id)?.address);
        setUId(`${id}`);
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

  if (machineDetail.managementUnit && !form.isFieldTouched('managementUnitId')) {
    form.setFieldValue('unitAddress', machineDetail.managementUnit.address);
  }

  const userDataSource = useMemo(
    () =>
      uDetails?.users
        ?.filter((user) => form.getFieldValue('userIds')?.includes(user.id!))
        .map((user, index) => ({
          index: index + 1,
          email: user.email,
          phoneNumber: user.phoneNumber,
          name: user.name,
        })),
    [uDetails, form],
  );

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
                disabled={disabledUserIds}
                mode="multiple"
                maxTagCount={4}
                maxTagTextLength={20}
                dropdownRender={(menu) => <DropdownOverlay menu={menu} users={uDetails?.users} />}
                allowClear
                onSelect={(value: string) => {
                  setUsers((prevUsers) => [
                    ...(prevUsers || []),
                    ...(uDetails?.users?.filter((user) => user.id === value) || []),
                  ]);
                }}
              >
                {uDetails?.users?.map((user) => (
                  <Select.Option value={user.id} key={user.id}>
                    {`${user.staffId} - ${user.name}`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={<FormattedMessage id="declare-unit.tableTitle" />} shouldUpdate>
              {() => (
                <Table
                  columns={userColumns}
                  dataSource={userDataSource
                    ?.concat(
                      users?.map((user, i) => ({
                        index: i + 1,
                        email: user.email,
                        name: user.name,
                        phoneNumber: user.phoneNumber,
                      })) || [],
                    )
                    .map((user, i) => ({
                      index: i + 1,
                      email: user.email,
                      phoneNumber: user.phoneNumber,
                      name: user.name,
                    }))}
                  // dataSource={userDataSource}
                  pagination={false}
                  bordered
                />
              )}
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
                  pattern: /^[a-zA-Z0-9\s]*$/g,
                  message: <FormattedMessage id="declare-machine.invalid-machineName" />,
                },
              ]}
            >
              <Input
                placeholder={machineDetail.name ?? intl.formatMessage({ id: 'machineName' })}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
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
