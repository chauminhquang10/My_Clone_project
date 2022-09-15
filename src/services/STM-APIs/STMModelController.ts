// @ts-ignore
/* eslint-disable */
import { request } from '@/utils';

/** Get STM list models  - Get list STM Models GET /api/v1/models */
export async function getListModels(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getListModelsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseListStmModelResponse>('/api/v1/models', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create STM model  - Create STM Model POST /api/v1/models */
export async function createModel(
  body: API.CreateStmModelRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStmModelDetailResponse>('/api/v1/models', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get model detail API  - Get model detail by id, configure minimum capacity GET /api/v1/models/${param0} */
export async function getModelDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getModelDetailParams,
  options?: { [key: string]: any },
) {
  const { modelId: param0, ...queryParams } = params;
  return request<API.ResponseBaseStmModelDetailResponse>(`/api/v1/models/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update model detail API  - Update model detail by id, configure minimum capacity PUT /api/v1/models/${param0} */
export async function updateModel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateModelParams,
  body: API.UpdateModelRequest,
  options?: { [key: string]: any },
) {
  const { modelId: param0, ...queryParams } = params;
  return request<API.ResponseBaseStmModelDetailResponse>(`/api/v1/models/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
