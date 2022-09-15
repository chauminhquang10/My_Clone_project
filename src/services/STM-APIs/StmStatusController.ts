// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /https${undefined}/api-stmc-ca-dev.hcm.unicloud.ai/hook/log-request-table */
export async function logRequestTable(options?: { [key: string]: any }) {
  return request<API.RestResponseObject>(
    `/https${undefined}/api-stmc-ca-dev.hcm.unicloud.ai/hook/log-request-table`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
