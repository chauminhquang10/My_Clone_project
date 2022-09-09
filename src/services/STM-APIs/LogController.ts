// @ts-ignore
/* eslint-disable */
import { request } from "umi";

/** Get daily log API  - Get daily log GET /api/v1/logs/${param0} */
export async function getLogs(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.getLogsParams,
    options?: { [key: string]: any }
) {
    const { machineId: param0, ...queryParams } = params;
    return request<any>(`/api/v1/logs/${param0}`, {
        method: "GET",
        params: {
            ...queryParams,
        },
        ...(options || {}),
    });
}
