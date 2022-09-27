import Api from '@/services/STM-APIs';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading } from '@ant-design/pro-components';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';

const loginPath = '/user/login';
const setupPasswordPath = '/user/setup-password';
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

// xử lí check role
const initialRoles = {
  create_machine: false,
  update_machine: false,
  assign_access: false,
  change_machine_status: false,
  download_machine_log: false,
  view_transaction: false,
  view_camera: false,
  create_version: false,
  update_version: false,
  update_machine_version: false,
  delete_version: false,
  create_model: false,
  update_model: false,
  delete_model: false,
  create_management_unit: false,
  update_management_unit: false,
  delete_management_unit: false,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserDetailResponse;
  currentRoles?: Record<string, boolean>;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.UserDetailResponse | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const { data } = await Api.UserController.getMyProfile();
      return data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  // if not login and setup password page, fetch user info
  if (history.location.pathname !== loginPath && history.location.pathname !== setupPasswordPath) {
    const currentUser = await fetchUserInfo();

    currentUser?.roleGroup?.actions?.forEach((eachAction) => {
      if ((eachAction?.action as string) in initialRoles) {
        initialRoles[eachAction?.action as string] = true;
      }
    });

    return {
      fetchUserInfo,
      currentUser,
      currentRoles: initialRoles,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}
