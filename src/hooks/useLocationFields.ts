import type {
  ResponseGetDistrictListByProvince,
  ResponseGetProvinceListByLocation,
  ResponseGetWardListByDistrict,
} from '@/pages/UnitTable/components/forms/NewUnitForm';
import { INITIAL_ENABLE_STATE } from '@/pages/UnitTable/components/forms/NewUnitForm';
import { getDistricts, getProvinces, getWards } from '@/services/STM-APIs/LocationController';
import type { FormInstance } from 'antd/es/form/Form';
import { useState } from 'react';
import { useRequest } from 'umi';

export const useLocationFields = <T>(form: FormInstance<T>) => {
  const [handleEnableDropdownList, setHandleEnableDropdownList] =
    useState<Record<string, boolean>>(INITIAL_ENABLE_STATE);

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
      cacheKey: `stm-create-form-province-${form.getFieldValue('provinceId')}`,
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
      cacheKey: `stm-create-form-district-${form.getFieldValue('districtId')}`,
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
      cacheKey: `stm-create-form-ward-${form.getFieldValue('wardId')}`,
    },
  );

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

  return {
    handleSelectChange,
    handleEnableDropdownList,
    provincesLoading,
    provincesData,
    districtsLoading,
    wardsLoading,
    wardsData,
    districtsData,
  };
};
