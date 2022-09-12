// @ts-ignore
/* eslint-disable */
import { request } from "umi";

/** Get all users API  - Get all user management API (Pagination) GET /api/v1/users */
export async function getAllUsers(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.getAllUsersParams,
    options?: { [key: string]: any }
) {
    return request<API.ResponseBasePageResponseObject>("/api/v1/users", {
        method: "GET",
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** Create User API  - Create new user with staffId, name, email, phone number, management unit ID POST /api/v1/users */
export async function createUser(
    body: API.CreateUserRequest,
    avatar?: File,
    options?: { [key: string]: any }
) {
    const formData = new FormData();

    if (avatar) {
        formData.append("avatar", avatar);
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

    return request<API.ResponseBaseUserResponse>("/api/v1/users", {
        method: "POST",
        data: formData,
        requestType: "form",
        ...(options || {}),
    });
}

/** Get user detail API  - Get user detail API GET /api/v1/users/${param0} */
export async function getUser(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.getUserParams,
    options?: { [key: string]: any }
) {
    const { userId: param0, ...queryParams } = params;
    return request<API.ResponseBaseUserDetailResponse>(
        `/api/v1/users/${param0}`,
        {
            method: "GET",
            params: { ...queryParams },
            ...(options || {}),
        }
    );
}

/** Update User API  - Update user information(staffId, email, name, management unit) PUT /api/v1/users/${param0} */
export async function updateUser(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.updateUserParams,
    body: API.UpdateUserRequest,
    avatar?: File,
    options?: { [key: string]: any }
) {
    const { userId: param0, ...queryParams } = params;
    const formData = new FormData();

    if (avatar) {
        formData.append("avatar", avatar);
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

    return request<API.ResponseBaseUserResponse>(`/api/v1/users/${param0}`, {
        method: "PUT",
        params: { ...queryParams },
        data: formData,
        requestType: "form",
        ...(options || {}),
    });
}

/** Block User API  - Block user API - change user's status to INACTIVE PUT /api/v1/users/block/${param0} */
export async function blockUser(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.blockUserParams,
    options?: { [key: string]: any }
) {
    const { userId: param0, ...queryParams } = params;
    return request<API.ResponseBaseUserResponse>(
        `/api/v1/users/block/${param0}`,
        {
            method: "PUT",
            params: { ...queryParams },
            ...(options || {}),
        }
    );
}

/** Check user existed  - Check if a user existed. KEYS: staffId || email || phoneNumber GET /api/v1/users/checking */
export async function checkUserExisted(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.checkUserExistedParams,
    options?: { [key: string]: any }
) {
    return request<API.ResponseBaseCheckUserExistResponse>(
        "/api/v1/users/checking",
        {
            method: "GET",
            params: {
                ...params,
            },
            ...(options || {}),
        }
    );
}

/** Get my profile  - Get current login user's profile GET /api/v1/users/profile */
export async function getMyProfile(options?: { [key: string]: any }) {
    return request<API.ResponseBaseUserDetailResponse>(
        "/api/v1/users/profile",
        {
            method: "GET",
            ...(options || {}),
        }
    );
}

/** Unblock User API  - Unblock user API - change user's status to ACTIVE PUT /api/v1/users/unblock/${param0} */
export async function unBlockUser(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.unBlockUserParams,
    options?: { [key: string]: any }
) {
    const { userId: param0, ...queryParams } = params;
    return request<API.ResponseBaseUserResponse>(
        `/api/v1/users/unblock/${param0}`,
        {
            method: "PUT",
            params: { ...queryParams },
            ...(options || {}),
        }
    );
}
