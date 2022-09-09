// @ts-ignore
/* eslint-disable */
import { request } from "umi";

/** Get list transactions  - Get list all transactions of a machine (FROM and TO date - optional) GET /api/v1/transactions/${param0} */
export async function getTransactions(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.getTransactionsParams,
    options?: { [key: string]: any }
) {
    const { machineId: param0, ...queryParams } = params;
    return request<API.ResponseBaseListTransactionsResponse>(
        `/api/v1/transactions/${param0}`,
        {
            method: "GET",
            params: {
                ...queryParams,
            },
            ...(options || {}),
        }
    );
}
