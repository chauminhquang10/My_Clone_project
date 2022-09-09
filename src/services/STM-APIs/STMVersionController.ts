// @ts-ignore
/* eslint-disable */
import { request } from "umi";

/** Get list versions  - Get all versions (no machineType param) or versions by machine Type.  GET /api/v1/versions */
export async function getAllVersion(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.getAllVersionParams,
    options?: { [key: string]: any }
) {
    return request<API.ResponseBasePageResponseObject>("/api/v1/versions", {
        method: "GET",
        params: {
            ...params,
            versionFilter: undefined,
            ...params["versionFilter"],
            pageReq: undefined,
            ...params["pageReq"],
        },
        ...(options || {}),
    });
}

/** Create version API - Create version API. Managed by model POST /api/v1/versions */
export async function uploadNewVersion(
    body: API.CreateVersionRequest,
    file?: File,
    options?: { [key: string]: any }
) {
    const formData = new FormData();

    if (file) {
        formData.append("file", file);
    }

    Object.keys(body).forEach((ele) => {
        const item = (body as any)[ele];

        if (item !== undefined && item !== null) {
            formData.append(
                ele,
                typeof item === "object" && !(item instanceof File)
                    ? JSON.stringify(item)
                    : item
            );
        }
    });

    return request<API.ResponseBaseVersionResponse>("/api/v1/versions", {
        method: "POST",
        data: formData,
        requestType: "form",
        ...(options || {}),
    });
}

/** Get version API - Get version by version ID.  GET /api/v1/versions/${param0} */
export async function getVersion(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.getVersionParams,
    options?: { [key: string]: any }
) {
    const { versionId: param0, ...queryParams } = params;
    return request<API.ResponseBaseVersionResponse>(
        `/api/v1/versions/${param0}`,
        {
            method: "GET",
            params: { ...queryParams },
            ...(options || {}),
        }
    );
}

/** Update version API - Update version  PUT /api/v1/versions/${param0} */
export async function updateVersion(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.updateVersionParams,
    body: API.UpdateVersionRequest,
    file?: File,
    options?: { [key: string]: any }
) {
    const { versionId: param0, ...queryParams } = params;
    const formData = new FormData();

    if (file) {
        formData.append("file", file);
    }

    Object.keys(body).forEach((ele) => {
        const item = (body as any)[ele];

        if (item !== undefined && item !== null) {
            formData.append(
                ele,
                typeof item === "object" && !(item instanceof File)
                    ? JSON.stringify(item)
                    : item
            );
        }
    });

    return request<API.ResponseBaseVersionResponse>(
        `/api/v1/versions/${param0}`,
        {
            method: "PUT",
            params: { ...queryParams },
            data: formData,
            requestType: "form",
            ...(options || {}),
        }
    );
}

/** Delete version API - Delete version when it hasn't been update into machine  DELETE /api/v1/versions/${param0} */
export async function deleteVersion(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.deleteVersionParams,
    options?: { [key: string]: any }
) {
    const { versionId: param0, ...queryParams } = params;
    return request<API.ResponseBaseVersionResponse>(
        `/api/v1/versions/${param0}`,
        {
            method: "DELETE",
            params: { ...queryParams },
            ...(options || {}),
        }
    );
}

/** Update Machine - Update Machine POST /api/v1/versions/update-machine */
export async function updateMachineVersion(
    body: API.UpdateMachineRequest,
    options?: { [key: string]: any }
) {
    return request<API.ResponseBaseUpdateMachineResponse>(
        "/api/v1/versions/update-machine",
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
