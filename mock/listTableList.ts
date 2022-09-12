import { Request, Response } from "express";
import moment from "moment";
import { parse } from "url";

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
    const tableListDataSource: API.UserResponse[] = [];

    for (let i = 0; i < pageSize; i += 1) {
        const index = (current - 1) * 10 + i;
        tableListDataSource.push({
            id: `${index}`,
            name: `TradeCode-${index}`,
            staffId: `No-${index}`,
            email: `Email${index}@gmail.com`,
            phoneNumber: `${Math.floor(Math.random() * 1000)}`,
            status: "ACTIVE",
            managementUnit: {
                code: "ABC",
                name: `${index}`,
            },
        });
    }
    return tableListDataSource;
};

const genListUnit = (current: number, pageSize: number) => {
    const tableListDataSource: API.ManagementUnitResponse[] = [];

    for (let i = 0; i < pageSize; i += 1) {
        const index = (current - 1) * 10 + i;
        tableListDataSource.push({
            id: index,
            code: `code-${index}`,
            name: `name-${index}`,
            location: `location-${index}`,
            province: {
                id: 1,
                name: `province-${index}`,
            },
            district: {
                id: 1,
                name: `districtrict-${index}`,
            },
            ward: {
                id: 1,
                name: `ward-${index}`,
            },
            address: `address-${index}`,
            createdAt: `createdAt-${index}`,
        });
    }
    return tableListDataSource;
};

let listUnit = genListUnit(1, 100);
let tableListDataSource = genList(1, 100);

function getRule(req: Request, res: Response, u: string) {
    let realUrl = u;
    if (
        !realUrl ||
        Object.prototype.toString.call(realUrl) !== "[object String]"
    ) {
        realUrl = req.url;
    }
    const { current = 1, pageSize = 10 } = req.query;
    const params = parse(realUrl, true).query as unknown as APIS.PageParams &
        APIS.RuleListItem & {
            sorter: any;
            filter: any;
        };

    let dataSource = [...tableListDataSource].slice(
        ((current as number) - 1) * (pageSize as number),
        (current as number) * (pageSize as number)
    );
    if (params.sorter) {
        const sorter = JSON.parse(params.sorter);
        dataSource = dataSource.sort((prev, next) => {
            let sortNumber = 0;
            Object.keys(sorter).forEach((key) => {
                if (sorter[key] === "descend") {
                    if (prev[key] - next[key] > 0) {
                        sortNumber += -1;
                    } else {
                        sortNumber += 1;
                    }
                    return;
                }
                if (prev[key] - next[key] > 0) {
                    sortNumber += 1;
                } else {
                    sortNumber += -1;
                }
            });
            return sortNumber;
        });
    }
    if (params.filter) {
        const filter = JSON.parse(params.filter as any) as {
            [key: string]: string[];
        };
        if (Object.keys(filter).length > 0) {
            dataSource = dataSource.filter((item) => {
                return Object.keys(filter).some((key) => {
                    if (!filter[key]) {
                        return true;
                    }
                    if (filter[key].includes(`${item[key]}`)) {
                        return true;
                    }
                    return false;
                });
            });
        }
    }

    if (params.name) {
        dataSource = dataSource.filter((data) =>
            data?.name?.includes(params.name || "")
        );
    }
    const result = {
        data: dataSource,
        total: tableListDataSource.length,
        success: true,
        pageSize,
        current: parseInt(`${params.current}`, 10) || 1,
    };

    return res.json(result);
}

function getListUnit(req: Request, res: Response, u: string) {
    let realUrl = u;
    if (
        !realUrl ||
        Object.prototype.toString.call(realUrl) !== "[object String]"
    ) {
        realUrl = req.url;
    }
    const { current = 1, pageSize = 10 } = req.query;
    const params = parse(realUrl, true).query as unknown as APIS.PageParams &
        APIS.RuleListItem & {
            sorter: any;
            filter: any;
        };

    let dataSource = [...listUnit].slice(
        ((current as number) - 1) * (pageSize as number),
        (current as number) * (pageSize as number)
    );
    if (params.sorter) {
        const sorter = JSON.parse(params.sorter);
        dataSource = dataSource.sort((prev, next) => {
            let sortNumber = 0;
            Object.keys(sorter).forEach((key) => {
                if (sorter[key] === "descend") {
                    if (prev[key] - next[key] > 0) {
                        sortNumber += -1;
                    } else {
                        sortNumber += 1;
                    }
                    return;
                }
                if (prev[key] - next[key] > 0) {
                    sortNumber += 1;
                } else {
                    sortNumber += -1;
                }
            });
            return sortNumber;
        });
    }
    if (params.filter) {
        const filter = JSON.parse(params.filter as any) as {
            [key: string]: string[];
        };
        if (Object.keys(filter).length > 0) {
            dataSource = dataSource.filter((item) => {
                return Object.keys(filter).some((key) => {
                    if (!filter[key]) {
                        return true;
                    }
                    if (filter[key].includes(`${item[key]}`)) {
                        return true;
                    }
                    return false;
                });
            });
        }
    }

    if (params.name) {
        dataSource = dataSource.filter((data) =>
            data?.name?.includes(params.name || "")
        );
    }
    const result = {
        data: dataSource,
        total: listUnit.length,
        success: true,
        pageSize,
        current: parseInt(`${params.current}`, 10) || 1,
    };

    return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
    let realUrl = u;
    if (
        !realUrl ||
        Object.prototype.toString.call(realUrl) !== "[object String]"
    ) {
        realUrl = req.url;
    }

    const body = (b && b.body) || req.body;
    const { method, name, desc, key } = body;

    switch (method) {
        /* eslint no-case-declarations:0 */
        case "delete":
            tableListDataSource = tableListDataSource.filter(
                (item) => key.indexOf(item.id) === -1
            );
            break;
        case "post":
            (() => {
                const i = Math.ceil(Math.random() * 10000);
                const newRule: APIS.RuleListItem = {
                    key: tableListDataSource.length,
                    href: "https://ant.design",
                    avatar: [
                        "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",
                        "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png",
                    ][i % 2],
                    name,
                    owner: "曲丽丽",
                    desc,
                    callNo: Math.floor(Math.random() * 1000),
                    status: Math.floor(Math.random() * 10) % 2,
                    updatedAt: moment().format("YYYY-MM-DD"),
                    createdAt: moment().format("YYYY-MM-DD"),
                    progress: Math.ceil(Math.random() * 100),
                };
                tableListDataSource.unshift(newRule);
                return res.json(newRule);
            })();
            return;

        case "update":
            (() => {
                let newRule = {};
                tableListDataSource = tableListDataSource.map((item) => {
                    if (item.id === key) {
                        newRule = { ...item, desc, name };
                        return { ...item, desc, name };
                    }
                    return item;
                });
                return res.json(newRule);
            })();
            return;
        default:
            break;
    }

    const result = {
        list: tableListDataSource,
        pagination: {
            total: tableListDataSource.length,
        },
    };

    res.json(result);
}

export default {
    "GET /api/rule": getRule,
    "POST /api/rule": postRule,
    "GET /api/listUnit": getListUnit,
};
