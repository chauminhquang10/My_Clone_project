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
    id: 'dashboard',
    path: '/dashboard',
  },
  {
    icon: <StmIcon src="machine-management" />,
    id: 'machine-management',
    path: '/machine',
    children: [
      {
        icon: <StmIcon src="machine-list" />,
        id: 'list',
        path: '/machine/list',
      },
      {
        icon: <img src={icons['machine-stats']} />,
        id: 'analytics',
        path: '/machine/analytics',
      },
      {
        icon: <img src={icons['machine-config']} />,
        id: 'config',
        path: '/machine/config',
      },
      {
        icon: <img src={icons['machine-update']} />,
        id: 'update-firmware',
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
    id: 'camera-management',
    path: '/camera',
    children: [
      {
        icon: <img src={icons['camera-log']} />,
        id: 'log',
        path: '/camera/log',
      },
    ],
  },
  {
    icon: <StmIcon src="user-management" />,
    id: 'user-management',
    path: '/users',
    children: [
      {
        icon: <StmIcon src="user-list" />,
        id: 'user-list',
        path: '/users/list',
      },
      {
        icon: <img src={icons['group-policy']} />,
        id: 'group-authorize',
        path: '/users/group-authorize',
      },
      {
        icon: <img src={icons['management-unit']} />,
        id: 'management-unit',
        path: '/users/management-unit',
      },
    ],
  },
  {
    icon: <StmIcon src="machine-history" />,
    id: 'history',
    path: '/history',
  },
];
