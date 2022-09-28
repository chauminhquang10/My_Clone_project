import {
  MachineManagementIcon,
  MachineListIcon,
  MachineAnalyticsIcon,
  ConfigIcon,
  MachineUpdateIcon,
  MachineWarningIcon,
  MachineHistoryIcon,
  CameraManagementIcon,
  CameraLogIcon,
  TransactionListIcon,
  UserManagementIcon,
  UserManagementListIcon,
  GroupPolicyIcon,
  UnitManagementIcon,
  DisplayManagementIcon,
  ScreenDisplayIcon,
  DisplayManagementStorageIcon,
} from '@/assets';
import type { Key, ReactNode } from 'react';
import StmIcon from './StmIcons';

export const icons = {
  'machine-management': MachineManagementIcon,
  'machine-list': MachineListIcon,
  'machine-stats': MachineAnalyticsIcon,
  'machine-config': ConfigIcon,
  'machine-update': MachineUpdateIcon,
  'machine-warning': MachineWarningIcon,
  'machine-history': MachineHistoryIcon,
  'camera-management': CameraManagementIcon,
  'camera-log': CameraLogIcon,
  'transaction-list': TransactionListIcon,
  'user-management': UserManagementIcon,
  'user-list': UserManagementListIcon,
  'group-policy': GroupPolicyIcon,
  'management-unit': UnitManagementIcon,
  'display-management': DisplayManagementIcon,
  'screen-display': ScreenDisplayIcon,
  'display-storage': DisplayManagementStorageIcon,
};

export interface MenuData {
  title: ReactNode;
  key: Key;
  isParent: boolean;
  icon: ReactNode;
}

export const menuData = [
  {
    icon: <StmIcon src="machine-management" />,
    id: 'Tổng quan',
    path: '/machine/test',
  },
  {
    icon: <StmIcon src="machine-management" />,
    id: 'Quản trị máy',
    path: '/machine',
    children: [
      {
        icon: <StmIcon src="machine-list" />,
        id: 'Danh sách máy',
        path: '/machine/list',
      },
      {
        icon: <img src={icons['machine-stats']} />,
        id: 'Thống kê hoạt động',
        path: '/machine/analytics',
      },
      {
        icon: <img src={icons['machine-config']} />,
        id: 'Cấu hình dòng máy',
        path: '/machine/config',
      },
      {
        icon: <img src={icons['machine-update']} />,
        id: 'Cập nhật phần mềm',
        path: '/machine/update-firmware',
      },
      // {
      //   icon: <img src={icons['machine-warning']} />,
      //   id: 'Cảnh báo hệ thống',
      //   path: '/machine/system-warning',
      // },
    ],
  },
  {
    icon: <StmIcon src="camera-management" />,
    id: 'Giám sát Camera',
    path: '/camera',
    children: [
      {
        icon: <img src={icons['camera-log']} />,
        id: 'Log hoạt động',
        path: '/camera/log',
      },
    ],
  },
  {
    icon: <StmIcon src="user-management" />,
    id: 'Quản trị người dùng',
    path: '/users',
    children: [
      {
        icon: <StmIcon src="user-list" />,
        id: 'Danh sách người dùng',
        path: '/users/list',
      },
      {
        icon: <img src={icons['group-policy']} />,
        id: 'Nhóm quyền',
        path: '/users/group-authorize',
      },
      {
        icon: <img src={icons['management-unit']} />,
        id: 'Đơn vị quản lý',
        path: '/users/management-unit',
      },
    ],
  },
  {
    icon: <StmIcon src="machine-history" />,
    id: 'Lịch sử',
    path: '/history',
  },
];
