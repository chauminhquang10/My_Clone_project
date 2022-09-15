import { CollapseIcon, UnCollapseIcon } from '@/assets';
import { useControllState } from '@/hooks';
import type {
  BasicLayoutProps as ProLayoutProps,
  MenuDataItem,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import 'antd/dist/antd.css';
import cx from 'classnames';
import { useCallback } from 'react';
import { history, Link, useIntl, useModel } from 'umi';
import logo from '../assets/logo/Logo.svg';
import RightContent from '../components/RightContent';
import { icons } from './data';
import styles from './layouts.less';
import MenuItem from './MenuItem';

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
  const [collapsed, setCollapsed] = useControllState(true);
  const handleCollapsed = useCallback(() => {
    setCollapsed((prev: boolean) => !prev);
  }, []);

  const { initialState } = useModel('@@initialState');

  console.log('initialState: ', initialState);

  const menuRender = useCallback(
    (menuProps, dom) => {
      return (
        <>
          <div
            className={cx(styles.stmMenuWrapper, {
              [styles.collapsed]: collapsed,
            })}
          />
          <div className={styles.stmMenu}>{dom}</div>
        </>
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
      route={{ routes }}
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
      className={styles['l[ayout-container-custom']}
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
