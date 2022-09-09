// @ts-ignore
/* eslint-disable */
import { request } from "umi";

/** Get list physical devices  - Get list physical device GET /api/v1/devices */
export async function getAllDevices(options?: { [key: string]: any }) {
    return request<API.ResponseBasePhysicalDevicesResponse>("/api/v1/devices", {
        method: "GET",
        ...(options || {}),
    });
}
