// @ts-ignore
/* eslint-disable */
import { request } from '@/utils';

/** Get list of roles  - Get list of roles GET /api/v1/roles */
export async function getListRoles(options?: { [key: string]: any }) {
  return request<API.ResponseBaseListRolesResponse>('/api/v1/roles', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get role detail  - Get Role detail GET /api/v1/roles/${param0} */
export async function getRoleDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoleDetailParams,
  options?: { [key: string]: any },
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.ResponseBaseRoleResponse>(`/api/v1/roles/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
