import { CloseIcon } from '@/assets';
import LocationFields from '@/pages/UnitTable/components/LocationFields';
import Api from '@/services/STM-APIs';
import { AimOutlined } from '@ant-design/icons';
import { useDebounce, useRequest } from 'ahooks';
import {
  AutoComplete,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Table,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Store } from 'sunflower-antd';
import styles from './editMachine.less';

interface DeclareUnitStepProps<T> {
  onCancel: () => void;
  submit: (values?: Store | undefined) => Promise<unknown>;
  onPrevious: () => void;
  form: FormInstance<T>;
}

interface UserData extends Pick<API.UserResponse, 'email' | 'name' | 'phoneNumber'> {
  index: number;
}

const userColumns: ColumnsType<UserData> = [
  {
    title: 'STT',
    align: 'center',
    dataIndex: 'index',
    width: '80px',
  },
  {
    title: <div style={{ textAlign: 'center' }}>Họ và tên</div>,
    dataIndex: 'name',
    width: '307px',
  },
  {
    title: <div style={{ textAlign: 'center' }}>Email</div>,
    dataIndex: 'email',
    width: '307px',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    width: '140px',
  },
];

const getAllUnit = () =>
  Api.ManagementUnitController.getAllManagementUnits({}).then(
    (res: API.ResponseBasePageResponseManagementUnitResponse) => res.data?.items,
  );

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
  submit,
  onPrevious,
  form,
}: DeclareUnitStepProps<T>) {
  const { data: unitList } = useRequest(getAllUnit);
  const [address, setAddress] = useState<string>();
  const debounceAddress = useDebounce(address, { wait: 500 });
  const [province, setProvince] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [ward, setWard] = useState<string>();
  const [coordinate, setCoordinate] = useState<[number, number]>([14.058324, 108.277199]);
  const disabledAddress =
    !form.getFieldValue('provinceId') ||
    !form.getFieldValue('districtId') ||
    !form.getFieldValue('wardId');

  const disabledUserIds = !form.getFieldValue('managementUnitId');
  console.log({ disabledUserIds });

  const { data: addressData } = useRequest(
    getAddressData(debounceAddress, province, district, ward),
    {
      ready: !!debounceAddress && !!province && !!district && !!ward,
      refreshDeps: [debounceAddress, province, district, ward],
    },
  );
  const [unitDetail, setUnitDetail] = useState<API.ManagementUnitDetailResponse>();
  const [userIds, setUserIds] = useState<string[]>([]);

  const onSearch = (searchText: string) => {
    setAddress(searchText);
  };

  const handleSelectAddress = (data: string) => {
    const shortLabel = addressData?.find((addr) => addr.attributes.ShortLabel === data);

    if (!shortLabel) throw Error(`Address should not be ${shortLabel}`);

    setCoordinate([shortLabel.location.y, shortLabel.location.x]);
  };

  const handleChangeUnitId = async (id: number) => {
    if (unitList) {
      form.setFieldValue('managementUnitId', id);
      form.setFieldValue('unitAddress', unitList.find((el) => el.id === id)?.address);

      try {
        const uDetail = (
          await Api.ManagementUnitController.getManagementUnit({
            unitId: form.getFieldValue('managementUnitId'),
          })
        ).data;
        setUnitDetail(uDetail);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleUserChange = (ids: string[]) => {
    const staffIdName = unitDetail?.users
      ?.filter((user) => ids.includes(user.id!))
      .map((user) => `${user.staffId} - ${user.name}`);
    if (!staffIdName) throw Error(`staffIdName should not be ${staffIdName}!`);

    setUserIds(staffIdName);
    form.setFieldValue('userIds', ids);
  };

  return (
    <>
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>
          <p className={styles.modalTitle}>Khai báo đơn vị quản lý</p>
        </Col>
        <Col>
          <span className={styles.closeIcon} onClick={onCancel}>
            <img src={CloseIcon} />
          </span>
        </Col>
      </Row>

      <Card
        title="Đơn vị quản lý"
        size="small"
        className={styles.myCard}
        style={{ borderRadius: 12 }}
      >
        <Row gutter={24} align="bottom">
          <Col span={12}>
            <Form.Item
              name="managementUnitId"
              label="Mã - Tên đơn vị"
              rules={[{ required: true, message: 'Mã - Tên đơn vị không được để trống' }]}
            >
              <Select onChange={handleChangeUnitId} placeholder="Mã - Tên đơn vị">
                {unitList?.map((unit) => (
                  <Select.Option key={unit.id} value={unit.id}>
                    {`${unit.id} - ${unit.name}`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="unitAddress" label="Địa chỉ đơn vị">
              <Input disabled placeholder={form.getFieldValue('unitAddress')} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="userIds" label="Mã - Tên nhân viên quản lý">
              <Dropdown
                trigger={['click']}
                disabled={disabledUserIds}
                overlay={
                  <Select showSearch onChange={handleUserChange} mode="multiple">
                    {unitDetail?.users?.map((user) => (
                      <Select.Option value={user.id} key={user.id}>
                        {`${user.staffId} - ${user.name}`}
                      </Select.Option>
                    ))}
                  </Select>
                }
              >
                <Select
                  mode="multiple"
                  placeholder="Mã - Tên nhân viên quản lý"
                  filterOption={false}
                  open={false}
                  value={userIds}
                />
              </Dropdown>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Danh sách nhân viên quản lý">
              <Table
                columns={userColumns}
                dataSource={unitDetail?.users
                  ?.filter((user) => form.getFieldValue('userIds')?.includes(user.id!))
                  .map((user, index) => ({
                    index: index + 1,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    name: user.name,
                  }))}
                pagination={false}
                bordered
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title="Địa chỉ máy" size="small" style={{ borderRadius: 12, marginTop: 24 }}>
        <Row gutter={[24, 24]} align="bottom">
          <LocationFields
            onSelectProvince={(_, options) => setProvince(options.children)}
            onSelectWard={(_, options) => setWard(options.children)}
            onSelectDistrict={(_, options) => setDistrict(options.children)}
            form={form}
          />
          <Col span={24}>
            <Form.Item
              name="address"
              label="Tên đường, Số nhà"
              rules={[{ required: true, message: 'Tên đường, Số nhà không được để trống' }]}
            >
              <AutoComplete
                placeholder="Tên đường, Số nhà"
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
            <MapContainer
              center={coordinate}
              zoom={13}
              scrollWheelZoom={false}
              style={{ width: '100%', height: 348 }}
            >
              <Card
                bodyStyle={{ padding: 0 }}
                style={{
                  position: 'absolute',
                  zIndex: 400,
                  right: 16,
                  top: 16,
                }}
              >
                <Row>
                  <Card size="small" title="Vĩ độ">
                    <Input disabled value={coordinate[0]} />
                  </Card>
                </Row>
                <Row>
                  <Card size="small" title="Vĩ độ">
                    <Input disabled value={coordinate[1]} />
                  </Card>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <Button>
                      <AimOutlined />
                    </Button>
                  </Col>
                  <Col span={16}>
                    <Button block>Xác nhận</Button>
                  </Col>
                </Row>
              </Card>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={coordinate}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </Col>
          <Col span={24}>
            <Form.Item name="machineName" label="Tên máy">
              <Input placeholder={'Tên máy'} />
            </Form.Item>
            <Typography.Text disabled>
              Tên máy là duy nhất, không chứa ký tự đặc biệt, tối đa 50 ký tự
            </Typography.Text>
          </Col>
        </Row>
      </Card>
      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button
          className={styles.cancelButton}
          size="large"
          onClick={() => {
            // onReset();
            onPrevious();
          }}
        >
          Quay lại
        </Button>
        <Button
          className={styles.submitButton}
          size="large"
          onClick={() => {
            submit().then((result) => {
              if (result === 'ok') {
                onCancel();
              }
            });
          }}
        >
          Hoàn tất
        </Button>
      </Row>
    </>
  );
}
