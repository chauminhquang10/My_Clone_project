// @ts-ignore
/* eslint-disable */
import { request } from '@/utils';

/** Get list STM API - Get list STM, pass filter values and page's values as parameters in the request URL GET /api/v1/machines */
export async function getListMachines(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getListMachinesParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBasePageResponseStmInfoResponse>('/api/v1/machines', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create STM  - Create STM by pass STM info into body request POST /api/v1/machines */
export async function createMachine(body: API.CreateStmRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseStmInfoResponse>('/api/v1/machines', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get STM details  - Get STM details by SMT's ID GET /api/v1/machines/${param0} */
export async function getMachineDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMachineDetailParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStmDetailResponse>(`/api/v1/machines/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update STM  - Update STM information PUT /api/v1/machines/${param0} */
export async function updateMachine(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateMachineParams,
  body: API.UpdateStmRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStmInfoResponse>(`/api/v1/machines/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Phần quyền quản trị máy cho user  - Tham số: User được phân quyền, mảng ID các máy được phân quyền. Danh sách mới thay thế cho danh sách cũ (Update) POST /api/v1/machines/access/assign-machines */
export async function assignMachine(
  body: API.AssignMachineRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseAssignMachineResponse>('/api/v1/machines/access/assign-machines', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Gán user vào máy  - Tham số: ID máy được phân quyền, mảng ID các user được phân quyền. Danh sách mới thay thế cho danh sách cũ (Update) POST /api/v1/machines/access/assign-users */
export async function assignUsers(body: API.AssignUserRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseAssignUserResponse>('/api/v1/machines/access/assign-users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Check if a machine existed  - Check if a machine existed. KEYS: terminal || ip || mac || serial GET /api/v1/machines/checking */
export async function checkMachineExisted(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkMachineExistedParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseCheckMachineExistResponse>('/api/v1/machines/checking', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Change machine's status  - Change machine status (in_service | out_of_service) PUT /api/v1/machines/status/${param0} */
export async function changeMachineStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeMachineStatusParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStmInfoResponse>(`/api/v1/machines/status/${param0}`, {
    method: 'PUT',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** System operations API  - Get System Operations. Date format dd-MM-yyyy GET /api/v1/machines/system-operations */
export async function getSystemOperation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSystemOperationParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBasePageResponseSystemOperationResponse>(
    '/api/v1/machines/system-operations',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
