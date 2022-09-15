// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Get list district API  - Get list districts by province's ID GET /api/v1/location/districts */
export async function getDistricts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDistrictsParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/location/districts', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get list provinces API  - Get list province by location (north || south || middle) GET /api/v1/location/provinces */
export async function getProvinces(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProvincesParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/location/provinces', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get list wards API  - Get list wards by district's ID GET /api/v1/location/wards */
export async function getWards(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWardsParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/location/wards', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
