import { useLocationFields } from '@/hooks/useLocationFields';
import type { FormInstance } from 'antd';
import { Col, Form, Select } from 'antd';
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
  return (
    <>
      <Col span={12}>
        <Form.Item name="location" label="Khu vực">
          <Select
            placeholder={detailMachine.location ?? 'Chọn khu vực'}
            onChange={(selectValue: string) => handleSelectChange('location', selectValue)}
          >
            <Select.Option value="north">Miền Bắc</Select.Option>
            <Select.Option value="middle">Miền Trung</Select.Option>
            <Select.Option value="south">Miền Nam</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="provinceId" label="Tỉnh/Thành phố">
          <Select
            placeholder={detailMachine.province?.name ?? 'Chọn Tỉnh/Thành phố'}
            onChange={(selectValue) => handleSelectChange('province', selectValue)}
            disabled={handleEnableDropdownList?.provinceDisabled ? true : false}
            loading={provincesLoading}
            onSelect={onSelectProvince}
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
        <Form.Item name="districtId" label="Quận/Huyện">
          <Select
            placeholder={detailMachine.district?.name ?? 'Chọn Quận/Huyện'}
            onChange={(selectValue) => handleSelectChange('district', selectValue)}
            disabled={handleEnableDropdownList.districtDisabled ? true : false}
            loading={districtsLoading}
            onSelect={onSelectDistrict}
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
        <Form.Item name="wardId" label="Phường/Xã">
          <Select
            placeholder={detailMachine.ward?.name ?? 'Chọn Phường/Xã'}
            onChange={(selectValue) => handleSelectChange('ward', selectValue)}
            disabled={handleEnableDropdownList.wardDisabled ? true : false}
            loading={wardsLoading}
            onSelect={onSelectWard}
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
