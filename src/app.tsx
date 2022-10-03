import Api from '@/services/STM-APIs';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading } from '@ant-design/pro-components';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { INITIAL_ROLES } from './constants';
import { objectKeys } from './utils';

const loginPath = '/user/login';
const setupPasswordPath = '/user/setup-password';
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserDetailResponse;
  currentRoles?: typeof INITIAL_ROLES;
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

    const initialRoles = { ...INITIAL_ROLES };

    if (currentUser?.admin) {
      objectKeys(initialRoles).forEach(function (key) {
        initialRoles[key] = true;
      });
    } else {
      currentUser?.roleGroup?.actions?.forEach((eachAction) => {
        if ((eachAction?.action as string) in initialRoles) {
          initialRoles[eachAction?.action as string] = true;
        }
      });
    }

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
