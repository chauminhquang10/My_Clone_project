import { ModalForm } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import closeIcon from '@/assets/images/svg/icon/close-icon.svg';
import styles from './NewUnitForm.less';
import { useRequest } from 'umi';
import { getDistricts, getProvinces, getWards } from '@/services/STM-APIs/LocationController';

const { Option } = Select;

export type CreateFormProps = {
  title: string;
  width: string;
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
  onFinish: (values: Partial<API.CreateManagementUnitRequest>) => Promise<void>;
};

export type ProvinceItem = {
  id: number;
  name: string;
  location: string;
};

export type ListProvincesResponse = {
  provinces?: ProvinceItem[];
};

export type ResponseGetProvinceListByLocation = {
  code?: number | undefined;
  message?: string | undefined;
  data?: ListProvincesResponse | undefined;
};

export type DistrictItem = {
  id: number;
  name: string;
};

export type ListDistrictsResponse = {
  districts?: DistrictItem[];
};

export type ResponseGetDistrictListByProvince = {
  code?: number | undefined;
  message?: string | undefined;
  data?: ListDistrictsResponse | undefined;
};

export type WardItem = {
  id: number;
  name: string;
};

export type ListWardsResponse = {
  wards?: WardItem[];
};

export type ResponseGetWardListByDistrict = {
  code?: number | undefined;
  message?: string | undefined;
  data?: ListWardsResponse | undefined;
};

export const INITIAL_ENABLE_STATE = {
  provinceDisabled: true,
  districtDisabled: true,
  wardDisabled: true,
};

const NewUnitForm: React.FC<CreateFormProps> = ({
  title,
  width,
  visible,
  onVisibleChange,
  onFinish,
}) => {
  const [handleEnableDropdownList, setHandleEnableDropdownList] =
    useState<Record<string, boolean>>(INITIAL_ENABLE_STATE);

  const [form] = Form.useForm();

  const {
    data: provincesData,
    loading: provincesLoading,
    cancel: cancelProvinces,
  } = useRequest<ResponseGetProvinceListByLocation>(
    () => {
      if (form.getFieldValue('location'))
        return getProvinces({ location: form.getFieldValue('location') });
      return new Promise(() => {
        cancelProvinces();
      });
    },
    {
      ready: form.getFieldValue('location') ? true : false,
      refreshDeps: [form.getFieldValue('location')],
    },
  );

  const {
    data: districtsData,
    loading: districtsLoading,
    cancel: cancelDistricts,
  } = useRequest<ResponseGetDistrictListByProvince>(
    () => {
      if (form.getFieldValue('provinceId'))
        return getDistricts({ provinceId: form.getFieldValue('provinceId') });
      return new Promise(() => {
        cancelDistricts();
      });
    },
    {
      ready: form.getFieldValue('provinceId') ? true : false,
      refreshDeps: [form.getFieldValue('provinceId')],
    },
  );

  const {
    data: wardsData,
    loading: wardsLoading,
    cancel: cancelWards,
  } = useRequest<ResponseGetWardListByDistrict>(
    () => {
      if (form.getFieldValue('districtId'))
        return getWards({ districtId: form.getFieldValue('districtId') });
      return new Promise(() => {
        cancelWards();
      });
    },
    {
      ready: form.getFieldValue('districtId') ? true : false,
      refreshDeps: [form.getFieldValue('districtId')],
    },
  );

  const onReset = () => {
    form.resetFields();
    onVisibleChange(false);
  };

  const handleSelectChange = (determineSelect: string, selectValue: string) => {
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
          <Form.Item
            name="code"
            label="Mã đơn vị"
            rules={[
              { required: true, message: 'Vui lòng nhập mã đơn vị!' },
              { max: 20, message: 'Tối đa 20 kí tự!' },
            ]}
            normalize={(value) => value.trim()}
          >
            <Input placeholder={'Nhập mã đơn vị'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Tên đơn vị"
            rules={[
              { required: true, message: 'Vui lòng nhập tên đơn vị!' },
              { max: 50, message: 'Tối đa 50 kí tự!' },
            ]}
            normalize={(value) => value.trim()}
          >
            <Input placeholder={'Nhập tên đơn vị'} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="location"
            label="Khu vực"
            rules={[{ required: true, message: 'Khu vực là băt buộc' }]}
          >
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
          <Form.Item
            name="provinceId"
            label="Tỉnh/Thành phố"
            rules={[{ required: true, message: 'Tỉnh/Thành phố là băt buộc' }]}
          >
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
          <Form.Item
            name="districtId"
            label="Quận/Huyện"
            rules={[{ required: true, message: 'Quận/Huyện là băt buộc' }]}
          >
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
          <Form.Item
            name="wardId"
            label="Phường/Xã"
            rules={[{ required: true, message: 'Phường/Xã là băt buộc' }]}
          >
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
          <Form.Item
            name="address"
            label="Tên đường, số nhà"
            rules={[
              { required: true, message: 'Tên đường, số nhà là băt buộc' },
              { max: 100, message: 'Tối đa 100 kí tự!' },
            ]}
            normalize={(value) => value.trim()}
          >
            <Input placeholder={'example'} />
          </Form.Item>
        </Col>
      </Row>

      <Row align="middle" justify="end" style={{ marginTop: '24px', gap: '16px' }}>
        <Button className={styles.cancelButton} size="large" onClick={onReset}>
          Huỷ bỏ
        </Button>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              className={styles.submitButton}
              size="large"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Hoàn tất
            </Button>
          )}
        </Form.Item>
      </Row>
    </ModalForm>
  );
};

export default NewUnitForm;
