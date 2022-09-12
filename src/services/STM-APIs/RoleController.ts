// @ts-ignore
/* eslint-disable */
import { request } from "umi";

/** Get list of roles  - Get list of roles GET /api/v1/roles */
export async function getListRoles(options?: { [key: string]: any }) {
    return request<API.ResponseBaseListRolesResponse>("/api/v1/roles", {
        method: "GET",
        ...(options || {}),
    });
}

/** Get list role group API  - Get list role group GET /api/v1/roles/groups */
export async function getAllRoleGroup(options?: { [key: string]: any }) {
    return request<API.ResponseBaseListRoleGroupResponse>(
        "/api/v1/roles/groups",
        {
            method: "GET",
            ...(options || {}),
        }
    );
}

/** Create role group API  - Create role group API POST /api/v1/roles/groups */
export async function createRoleGroup(
    body: API.CreateRoleGroupRequest,
    options?: { [key: string]: any }
) {
    return request<API.ResponseBaseRoleGroupResponse>("/api/v1/roles/groups", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: body,
        ...(options || {}),
    });
}

/** Get role group detail  - Get role group detail GET /api/v1/roles/groups/${param0} */
export async function getRoleDetail(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.getRoleDetailParams,
    options?: { [key: string]: any }
) {
    const { groupId: param0, ...queryParams } = params;
    return request<API.ResponseBaseRoleGroupResponse>(
        `/api/v1/roles/groups/${param0}`,
        {
            method: "GET",
            params: { ...queryParams },
            ...(options || {}),
        }
    );
}
