import { ModalForm } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import styles from './UpdateUnitForm.less';
import { useRequest } from 'umi';
import { getDistricts, getProvinces, getWards } from '@/services/STM-APIs/LocationController';

const { Option } = Select;

type ProvinceItem = {
  id: number;
  name: string;
  location: string;
};

type ListProvincesResponse = {
  provinces?: ProvinceItem[];
};

type ResponseGetProvinceListByLocation = {
  code?: number | undefined;
  message?: string | undefined;
  data?: ListProvincesResponse | undefined;
};

type DistrictItem = {
  id: number;
  name: string;
};

type ListDistrictsResponse = {
  districts?: DistrictItem[];
};

type ResponseGetDistrictListByProvince = {
  code?: number | undefined;
  message?: string | undefined;
  data?: ListDistrictsResponse | undefined;
};

type WardItem = {
  id: number;
  name: string;
};

type ListWardsResponse = {
  wards?: WardItem[];
};

type ResponseGetWardListByDistrict = {
  code?: number | undefined;
  message?: string | undefined;
  data?: ListWardsResponse | undefined;
};

const INITIAL_ENABLE_STATE = {
  provinceDisabled: false,
  districtDisabled: false,
  wardDisabled: false,
};

type UpdateUnitFormProps = {
  title: string;
  width: string;
  visible: boolean;
  unitDetail: API.ManagementUnitDetailResponse;
  onVisibleChange: (value: boolean) => void;
  onFinish: (values: Partial<API.UpdateManagementUnitRequest>) => Promise<void>;
};

const UpdateUnitForm: React.FC<UpdateUnitFormProps> = ({
  title,
  width,
  visible,
  unitDetail,
  onVisibleChange,
  onFinish,
}) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    onVisibleChange(false);
  };

  const [handleEnableDropdownList, setHandleEnableDropdownList] =
    useState<Record<string, boolean>>(INITIAL_ENABLE_STATE);

  const { data: provincesData, loading: provincesLoading } =
    useRequest<ResponseGetProvinceListByLocation>(
      () => {
        return getProvinces({ location: form.getFieldValue('location') });
      },
      {
        refreshDeps: [form.getFieldValue('location')],
      },
    );

  const { data: districtsData, loading: districtsLoading } =
    useRequest<ResponseGetDistrictListByProvince>(
      () => {
        return getDistricts({ provinceId: form.getFieldValue('provinceId') });
      },
      {
        refreshDeps: [form.getFieldValue('provinceId')],
      },
    );

  const { data: wardsData, loading: wardsLoading } = useRequest<ResponseGetWardListByDistrict>(
    () => {
      return getWards({ districtId: form.getFieldValue('districtId') });
    },
    {
      refreshDeps: [form.getFieldValue('districtId')],
    },
  );

  const handleSelectChange = (determineSelect: string, selectValue: string | number) => {
    switch (determineSelect) {
      case 'location':
        form.resetFields(['provinceId', 'districtId', 'wardId']);
        form.setFieldValue('location', selectValue);
        setHandleEnableDropdownList({
          districtDisabled: true,
          wardDisabled: true,
          provinceDisabled: false,
        });
        break;
      case 'province':
        console.log('a1 a2', typeof selectValue);
        form.resetFields(['districtId', 'wardId']);
        form.setFieldValue('provinceId', selectValue);
        setHandleEnableDropdownList({
          ...handleEnableDropdownList,
          wardDisabled: true,
          districtDisabled: false,
        });
        break;
      case 'district':
        form.resetFields(['wardId']);
        form.setFieldValue('districtId', selectValue);
        setHandleEnableDropdownList({ ...handleEnableDropdownList, wardDisabled: false });
        break;
      case 'ward':
        form.setFieldValue('wardId', selectValue);
        break;
    }
  };

  return (
    <ModalForm
      form={form}
      width={width}
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={onFinish}
      modalProps={{
        centered: true,
        closable: false,
        destroyOnClose: true,
        className: styles.myModalForm,
      }}
      submitTimeout={2000}
      onInit={() => {
        form.setFieldValue('code', unitDetail?.code);
        form.setFieldValue('name', unitDetail?.name);
        form.setFieldValue('location', unitDetail?.location);
        form.setFieldValue('provinceId', unitDetail?.province?.id);
        form.setFieldValue('districtId', unitDetail?.district?.id);
        form.setFieldValue('wardId', unitDetail?.ward?.id);
        form.setFieldValue('address', unitDetail?.address);
      }}
    >
      <Row align="top" justify="space-between" className={styles.modalFormHeader}>
        <Col>
          <p className={styles.modalTitle}>{title}</p>
        </Col>
        <Col>
          <span onClick={onReset} className={styles.closeIcon}>
            <img src={closeIcon} />
          </span>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Form.Item name="code" label="Mã đơn vị">
            <Input placeholder={'Nhập mã đơn vị'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="name" label="Tên đơn vị">
            <Input placeholder={'Nhập tên đơn vị'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="location" label="Khu vực">
            <Select
              placeholder="Chọn khu vực"
              onChange={(selectValue) => handleSelectChange('location', selectValue)}
            >
              <Option value="north">Miền Bắc</Option>
              <Option value="middle">Miền Trung</Option>
              <Option value="south">Miền Nam</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="provinceId" label="Tỉnh/Thành phố">
            <Select
              placeholder="Chọn Tỉnh/Thành phố"
              onChange={(selectValue) => handleSelectChange('province', selectValue)}
              disabled={handleEnableDropdownList.provinceDisabled ? true : false}
              loading={provincesLoading}
            >
              {provincesData?.provinces?.map((province: ProvinceItem) => (
                <Option key={province.id} value={province.id}>
                  {province.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="districtId" label="Quận/Huyện">
            <Select
              placeholder="Chọn Quận/Huyện"
              onChange={(selectValue) => handleSelectChange('district', selectValue)}
              disabled={handleEnableDropdownList.districtDisabled ? true : false}
              loading={districtsLoading}
            >
              {districtsData?.districts?.map((district: DistrictItem) => (
                <Option key={district.id} value={district.id}>
                  {district.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="wardId" label="Phường/Xã">
            <Select
              placeholder="Chọn Phường/Xã"
              onChange={(selectValue) => handleSelectChange('ward', selectValue)}
              disabled={handleEnableDropdownList.wardDisabled ? true : false}
              loading={wardsLoading}
            >
              {wardsData?.wards?.map((ward: WardItem) => (
                <Option key={ward.id} value={ward.id}>
                  {ward.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="address" label="Tên đường, số nhà">
            <Input placeholder={'example'} />
          </Form.Item>
        </Col>
      </Row>

      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button className={styles.cancelButton} size="large" onClick={onReset}>
          Huỷ bỏ
        </Button>
        <Button className={styles.submitButton} size="large" htmlType="submit">
          Lưu
        </Button>
      </Row>
    </ModalForm>
  );
};

export default UpdateUnitForm;
