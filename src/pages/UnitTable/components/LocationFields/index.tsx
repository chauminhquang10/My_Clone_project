import { useLocationFields } from '@/hooks/useLocationFields';
import type { FormInstance } from 'antd';
import { Col, Form, Select } from 'antd';
import { useCallback } from 'react';
import { FormattedMessage } from 'umi';
import type { DistrictItem, ProvinceItem, WardItem } from '../forms/NewUnitForm';

interface SelectOption {
  children: string;
  'data-inspector-column': string;
  'data-inspector-line': string;
  'data-inspector-relative-path': string;
  key: string;
  value: unknown;
}

type HandleSelect = (value: string, options: SelectOption) => void;

interface LocationFieldsProps<T> extends API.StmDetailResponse {
  form: FormInstance<T>;
  onSelectProvince?: HandleSelect;
  onSelectDistrict?: HandleSelect;
  onSelectWard?: HandleSelect;
}

export default function LocationFields<T>({
  form,
  onSelectDistrict,
  onSelectProvince,
  onSelectWard,
  ...detailMachine
}: LocationFieldsProps<T>) {
  const {
    districtsData,
    districtsLoading,
    handleEnableDropdownList,
    handleSelectChange,
    provincesData,
    provincesLoading,
    wardsData,
    wardsLoading,
  } = useLocationFields(form);
  const getPopupContainer = useCallback((trigger) => trigger.parentNode, []);
  return (
    <>
      <Col span={12}>
        <Form.Item name="location" label={<FormattedMessage id="location" />}>
          <Select
            placeholder={
              detailMachine.location ?? <FormattedMessage id="declare-unit.selectLocation" />
            }
            onChange={(selectValue: string) => handleSelectChange('location', selectValue)}
            getPopupContainer={getPopupContainer}
          >
            <Select.Option value="north">
              <FormattedMessage id="north" />
            </Select.Option>
            <Select.Option value="middle">
              <FormattedMessage id="middle" />
            </Select.Option>
            <Select.Option value="south">
              <FormattedMessage id="south" />
            </Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="provinceId" label={<FormattedMessage id="machine-table.province/city" />}>
          <Select
            placeholder={
              detailMachine.province?.name ?? (
                <FormattedMessage id="machine-table.pickProvince/city" />
              )
            }
            onChange={(selectValue) => handleSelectChange('province', selectValue)}
            disabled={handleEnableDropdownList?.provinceDisabled ? true : false}
            loading={provincesLoading}
            onSelect={onSelectProvince}
            getPopupContainer={getPopupContainer}
          >
            {provincesData?.provinces?.map((province: ProvinceItem) => (
              <Select.Option key={province.id} value={province.id}>
                {province.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="districtId" label={<FormattedMessage id="machine-table.district" />}>
          <Select
            placeholder={
              detailMachine.district?.name ?? <FormattedMessage id="machine-table.pickDistrict" />
            }
            onChange={(selectValue) => handleSelectChange('district', selectValue)}
            disabled={handleEnableDropdownList.districtDisabled ? true : false}
            loading={districtsLoading}
            onSelect={onSelectDistrict}
            getPopupContainer={getPopupContainer}
          >
            {districtsData?.districts?.map((district: DistrictItem) => (
              <Select.Option key={district.id} value={district.id}>
                {district.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="wardId" label={<FormattedMessage id="machine-table.ward" />}>
          <Select
            placeholder={
              detailMachine.ward?.name ?? <FormattedMessage id="machine-table.pickWard" />
            }
            onChange={(selectValue) => handleSelectChange('ward', selectValue)}
            disabled={handleEnableDropdownList.wardDisabled ? true : false}
            loading={wardsLoading}
            onSelect={onSelectWard}
            getPopupContainer={getPopupContainer}
          >
            {wardsData?.wards?.map((ward: WardItem) => (
              <Select.Option key={ward.id} value={ward.id}>
                {ward.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </>
  );
}
