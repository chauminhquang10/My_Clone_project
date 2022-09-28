import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Api from '@/services/STM-APIs';
import { Avatar, Menu, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useState } from 'react';
import { history, useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { openNotification } from '@/utils';
import { UserDetailDrawer } from '@/pages/UserTable/components';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const loginOut = async () => {
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const res = await Api.AuthController.logout({ refreshToken });

  if (res.code === 0) {
    openNotification('success', 'Đăng xuất thành công!');
  }

  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [openPersonalProfile, setOpenPersonalProfile] = useState<boolean>(false);

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;

      switch (key) {
        case 'personal-profile':
          setOpenPersonalProfile(true);
          break;
        case 'logout':
          setInitialState((s) => ({ ...s, currentUser: undefined, currentRoles: undefined }));
          loginOut();
          break;
        default:
          history.push(`/account/${key}`);
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuItems: ItemType[] = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'personal-profile',
      label: 'Chi tiết cá nhân',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
    },
  ];

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );

  return (
    <>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="default" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        </span>
      </HeaderDropdown>

      <UserDetailDrawer
        currentRow={currentUser}
        showDetail={openPersonalProfile}
        setShowDetail={setOpenPersonalProfile}
        isPersonalProfile={true}
      />
    </>
  );
};

export default AvatarDropdown;
