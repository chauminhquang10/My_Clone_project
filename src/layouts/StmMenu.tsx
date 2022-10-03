import { genKey } from '@/utils';
import { Layout } from 'antd';
import { useState, useCallback } from 'react';
import { menuData } from './data';
import cx from 'classnames';
import styles from './layouts.less';
import SubMenu from './SubMenu';
import { useLocation, useModel } from 'umi';

interface StmMenuProps {
  collapsed: boolean;
}

export default function StmMenu({ collapsed }: StmMenuProps) {
  const { initialState } = useModel('@@initialState');
  const location = useLocation();
  const [showSubNav, setShowSubNav] = useState<string[]>([`/${location.pathname.split('/')[1]}`]);
  console.log({ showSubNav, path: location.pathname });
  const [currentRoute, setCurrentRoute] = useState<string>(location.pathname);
  const handleClick = useCallback(
    (path: string) => () => {
      setShowSubNav((currentPath) =>
        currentPath.includes(path)
          ? currentPath.filter((currPath) => currPath !== path)
          : [...currentPath, path],
      );
    },
    [],
  );

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
            disabled={!initialState?.currentUser?.admin && menu.path.includes('users')}
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
}
