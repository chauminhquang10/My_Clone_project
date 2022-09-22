const routes = [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        name: 'forgot-password',
        path: '/user/forgot-password',
        component: './user/ForgotPassword',
      },
      {
        name: 'reset-password',
        path: '/user/reset-password',
        component: './user/ResetPassword',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    component: '@/layouts/BaseLayout',
    menu: {
      flatMenu: true,
    },
    routes: [
      {
        path: '/',
        redirect: '/machine/list',
      },
      {
        path: '/machine',
        name: 'Quản trị máy',
        icon: 'machine-management',
        routes: [
          {
            path: '/machine/list',
            name: 'Danh sách máy',
            icon: 'machine-list',
            component: 'MachineTable',
          },
          {
            path: '/machine/analytics',
            name: 'Thống kê hoạt động',
            icon: 'machine-stats',
            component: 'StatisActivityTable',
          },
          {
            path: '/machine/config',
            name: 'Cấu hình dòng máy',
            icon: 'machine-config',
            component: 'ConfigMachineTable',
          },
          {
            path: '/machine/update-firmware',
            name: 'Cập nhật phần mềm',
            icon: 'machine-update',
            component: 'UpdateVersionTable',
          },
          {
            path: '/machine/system-warning',
            name: 'Cảnh báo hệ thống',
            icon: 'machine-warning',
            component: 'SystemWarningTable',
          },
        ],
      },
      {
        path: '/camera',
        name: 'Giám sát Camera',
        icon: 'camera-management',
        routes: [
          {
            path: '/camera/log',
            name: 'Log hoạt động',
            icon: 'camera-log',
            component: 'TableList',
          },
          {
            path: '/camera/transaction-list',
            name: 'Danh sách hoạt động',
            icon: 'transaction-list',
            component: 'TableList',
          },
        ],
      },
      {
        path: '/users',
        name: 'Quản trị người dùng',
        icon: 'user-management',
        routes: [
          {
            path: '/users/list',
            component: './UserTable',
            name: 'Danh sách người dùng',
            icon: 'user-list',
          },
          {
            path: '/users/group-authorize',
            name: 'Nhóm quyền',
            icon: 'group-policy',
            component: 'GroupAuthorizeTable',
          },
          {
            path: '/users/management-unit',
            name: 'Đơn vị quản lý',
            icon: 'management-unit',
            component: './UnitTable',
          },
          {
            component: './404',
          },
        ],
      },
      {
        icon: 'display-management',
        name: 'Quản lí hiển thị',
        path: '/display',
        routes: [
          {
            path: '/display/screen-display',
            name: 'Màn hình hiển thị',
            icon: 'screen-display',
            component: 'TableList',
          },
          {
            path: '/display/storage',
            name: 'Kho lưu trữ',
            icon: 'display-storage',
            component: 'TableList',
          },
        ],
      },
      {
        path: '/history',
        name: 'Lịch sử',
        icon: 'machine-history',
        component: 'HistoryList',
        menu: {
          flatMenu: true,
        },
      },
    ],
  },
  {
    component: './404',
  },
];

export default routes;
