// @ts-ignore
/* eslint-disable */
import { request } from "umi";

/** Get list of management units - Get list of management units GET /api/v1/management-units */
export async function getAllManagementUnits(options?: { [key: string]: any }) {
    return request<API.ResponseBaseListManagementUnitResponse>(
        "/api/v1/management-units",
        {
            method: "GET",
            ...(options || {}),
        }
    );
}

/** Create management unit - Create management unit POST /api/v1/management-units */
export async function createManagementUnit(
    body: API.CreateManagementUnitRequest,
    options?: { [key: string]: any }
) {
    return request<API.ResponseBaseManagementUnitResponse>(
        "/api/v1/management-units",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: body,
            ...(options || {}),
        }
    );
}

/** Management unit detail - Get management unit detail GET /api/v1/management-units/${param0} */
export async function getManagementUnit(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.getManagementUnitParams,
    options?: { [key: string]: any }
) {
    const { unitId: param0, ...queryParams } = params;
    return request<API.ResponseBaseManagementUnitDetailResponse>(
        `/api/v1/management-units/${param0}`,
        {
            method: "GET",
            params: { ...queryParams },
            ...(options || {}),
        }
    );
}

/** Update management unit - Update management unit PUT /api/v1/management-units/${param0} */
export async function updateManagementUnit(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.updateManagementUnitParams,
    body: API.UpdateManagementUnitRequest,
    options?: { [key: string]: any }
) {
    const { unitId: param0, ...queryParams } = params;
    return request<API.ResponseBaseManagementUnitResponse>(
        `/api/v1/management-units/${param0}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            params: { ...queryParams },
            data: body,
            ...(options || {}),
        }
    );
}
