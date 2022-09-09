// @ts-ignore
/* eslint-disable */
import { request } from "umi";

/** Get list denominations API  - Get list of denominations GET /api/v1/denominations */
export async function getListDenominations(options?: { [key: string]: any }) {
    return request<any>("/api/v1/denominations", {
        method: "GET",
        ...(options || {}),
    });
}
