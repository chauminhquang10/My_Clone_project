const routes = [
    {
        path: "/user",
        layout: false,
        routes: [
            {
                name: "login",
                path: "/user/login",
                component: "./user/Login",
            },
            {
                component: "./404",
            },
        ],
    },
    {
        path: "/",
        component: "@/layouts/BaseLayout",
        menu: {
            flatMenu: true,
        },
        routes: [
            {
                path: "/",
                redirect: "/machine/list",
            },
            {
                path: "/machine",
                name: "machine-management",
                icon: "machine-management",
                routes: [
                    {
                        path: "/machine/list",
                        name: "list",
                        icon: "machine-list",
                        component: "MachineTable",
                    },
                    {
                        path: "/machine/analytics",
                        name: "analytics",
                        icon: "machine-stats",
                        component: "StatisActivityTable",
                    },
                    {
                        path: "/machine/config",
                        name: "config",
                        icon: "machine-config",
                        component: "ConfigMachineTable",
                    },
                    {
                        path: "/machine/update-firmware",
                        name: "update-firmware",
                        icon: "machine-update",
                        component: "UpdateVersionTable",
                    },
                    {
                        path: "/machine/system-warning",
                        name: "system-warning",
                        icon: "machine-warning",
                        component: "SystemWarningTable",
                    },
                    {
                        path: "/machine/history",
                        name: "history",
                        icon: "machine-history",
                        component: "TableList",
                    },
                ],
            },
            {
                path: "/camera",
                name: "camera-management",
                icon: "camera-management",
                routes: [
                    {
                        path: "/camera/log",
                        name: "log",
                        icon: "camera-log",
                        component: "TableList",
                    },
                    {
                        path: "/camera/transaction-list",
                        name: "transaction-list",
                        icon: "transaction-list",
                        component: "TableList",
                    },
                ],
            },
            {
                path: "/users",
                name: "user-management",
                icon: "user-management",
                access: "canAdmin",
                routes: [
                    {
                        path: "/users/list",
                        component: "./UserTable",
                        name: "user-list",
                        icon: "user-list",
                    },
                    {
                        path: "/users/group-authorize",
                        name: "group-authorize",
                        icon: "group-policy",
                        component: "./Welcome",
                    },
                    {
                        path: "/users/management-unit",
                        name: "management-unit",
                        icon: "management-unit",
                        component: "./UnitTable",
                    },
                    {
                        component: "./404",
                    },
                ],
            },
            {
                name: "display-management",
                icon: "display-management",
                path: "/display",
                routes: [
                    {
                        path: "/display/screen-display",
                        name: "screen-display",
                        icon: "screen-display",
                        component: "TableList",
                    },
                    {
                        path: "/display/storage",
                        name: "store-display",
                        icon: "display-storage",
                        component: "TableList",
                    },
                ],
            },
        ],
    },
    {
        component: "./404",
    },
];

export default routes;
