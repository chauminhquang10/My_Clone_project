import { CollapseIcon, UnCollapseIcon } from '@/assets';
import { useControllState } from '@/hooks';
import { genKey } from '@/utils';
import type {
  BasicLayoutProps as ProLayoutProps,
  MenuDataItem,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { Layout } from 'antd';
import cx from 'classnames';
import { useCallback, useState } from 'react';
import { history, Link, useIntl, useModel } from 'umi';
import logo from '../assets/logo/Logo.svg';
import RightContent from '../components/RightContent';
import { icons, menuData } from './data';
import styles from './layouts.less';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

const loginPath = '/user/login';

export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  routes: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
} & ProLayoutProps;

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    return {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
  });

const BasicLayout = ({ children, routes, ...props }: BasicLayoutProps) => {
  const { formatMessage } = useIntl();
  const [collapsed, setCollapsed] = useControllState(false);
  const handleCollapsed = useCallback(() => {
    setCollapsed((prev: boolean) => !prev);
  }, []);

  const { initialState } = useModel('@@initialState');

  const menuRender = useCallback(
    (menuProps, dom) => {
      console.log({ menuProps, dom });

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [showSubNav, setShowSubNav] = useState<string>('/machine');
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [currentRoute, setCurrentRoute] = useState<string>('/machine/list');
      const handleClick = (path: string) => () => {
        setShowSubNav(path);
      };

      return (
        <Layout.Sider collapsed={collapsed} width={240} id="sider">
          <div
            className={cx(styles.stmMenuWrapper, {
              [styles.collapsed]: collapsed,
            })}
          />
          <div className={cx(styles.stmMenu, { [styles.collapsed]: collapsed })}>
            {menuData.map((menu) => (
              <SubMenu
                {...menu}
                collapsed={collapsed}
                showSubNav={showSubNav}
                onClick={handleClick}
                currentRoute={currentRoute}
                setCurrentRoute={setCurrentRoute}
                key={genKey()}
              />
            ))}
          </div>
        </Layout.Sider>
      );
    },
    [collapsed],
  );

  const subMenuItemRender = useCallback((item) => {
    const Icon = icons[item.icon as keyof typeof item.icon];

    return (
      <>
        <img src={Icon} />
        &nbsp; &nbsp;
        {item.name}
      </>
    );
  }, []);
  const headerRender = useCallback(() => {
    const Icon = collapsed ? UnCollapseIcon : CollapseIcon;

    return (
      <div className={styles.stmHeader}>
        <img src={Icon} onClick={handleCollapsed} />
        <Link to="/">
          <img src={logo} alt="KLB Logo" />
        </Link>
        <RightContent />
      </div>
    );
  }, [collapsed, handleCollapsed]);

  return (
    <ProLayout
      {...props}
      logo={false}
      title={false}
      headerHeight={64}
      menuHeaderRender={false}
      collapsedButtonRender={false}
      formatMessage={formatMessage}
      inlineCollapsed
      collapsed={collapsed}
      onCollapse={handleCollapsed}
      layout="mix"
      menuRender={menuRender}
      siderWidth={240}
      // footerRender={false}
      subMenuItemRender={subMenuItemRender}
      menuDataRender={menuDataRender}
      menuItemRender={(menuItemProps, defaultDom) => (
        <MenuItem defaultDom={defaultDom} menuItemProps={menuItemProps} />
      )}
      headerRender={headerRender}
      className={styles['layout-container-custom']}
      onPageChange={() => {
        const { location } = history;

        if (!initialState?.currentUser && location.pathname !== loginPath) {
          history.push(loginPath);
        }
      }}
    >
      {children}
    </ProLayout>
  );
};

export default BasicLayout;
