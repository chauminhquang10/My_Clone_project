import { CollapseIcon, UnCollapseIcon } from '@/assets';
import type {
  BasicLayoutProps as ProLayoutProps,
  MenuDataItem,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { useLocalStorageState } from 'ahooks';
import { useCallback } from 'react';
import { history, Link, useIntl, useModel } from 'umi';
import logo from '../assets/images/utmc-logo.png';
import RightContent from '../components/RightContent';
import { icons } from './data';
import styles from './layouts.less';
import MenuItem from './MenuItem';
import StmMenu from './StmMenu';

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
  const [collapsed, setCollapsed] = useLocalStorageState<boolean>('stmc-collapsed', {
    defaultValue: false,
  });
  const handleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, [setCollapsed]);

  const { initialState } = useModel('@@initialState');

  const menuRender = useCallback(
    (menuProps, dom) => {
      console.log({ menuProps, dom });
      return <StmMenu collapsed={collapsed} />;
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
          <img src={logo} width={132} style={{ objectFit: 'cover' }} alt="KLB Logo" />
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
