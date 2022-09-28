import { genKey } from '@/utils';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import cx from 'classnames';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { FormattedMessage, history } from 'umi';
import styles from './layouts.less';

interface BaseMenu {
  collapsed?: boolean;
  icon: ReactNode;
  id: string;
  path: string;
}

interface SubMenuProps extends BaseMenu {
  children?: BaseMenu[];
  isChildren?: boolean;
  showSubNav?: string;
  onClick?: (path: string) => () => void;
  currentRoute: string | undefined;
  setCurrentRoute: Dispatch<SetStateAction<string>>;
}

export default function SubMenu({
  icon,
  id,
  path,
  collapsed,
  children,
  isChildren,
  onClick,
  showSubNav,
  currentRoute,
  setCurrentRoute,
}: SubMenuProps) {
  const handleNavigate = () => {
    history.push(path);
    setCurrentRoute(path);
  };

  return (
    <div
      className={cx({
        [styles.menuContainer]: !isChildren,
        [styles.collapsed]: collapsed,
        [styles.current]: currentRoute === path,
      })}
      onClick={!children ? handleNavigate : onClick?.(path)}
    >
      <div
        className={cx(styles.menuItem, {
          [styles.child]: isChildren,
          [styles.collapsed]: collapsed,
          [styles.single]: !children && !isChildren,
        })}
      >
        <>
          {!isChildren && !collapsed && (
            <div style={{ opacity: children ? 1 : 0 }}>
              {showSubNav === path ? (
                <CaretUpFilled className={styles.arrow} />
              ) : (
                <CaretDownFilled className={styles.arrow} />
              )}
            </div>
          )}
          {icon}
          {!collapsed && (
            <Typography.Text className={styles.title} ellipsis>
              <FormattedMessage id={id} />
            </Typography.Text>
          )}
        </>
      </div>
      {showSubNav === path && (
        <>
          {children?.map((child) => (
            <SubMenu
              {...child}
              collapsed={collapsed}
              key={genKey()}
              currentRoute={currentRoute}
              setCurrentRoute={setCurrentRoute}
              isChildren
            />
          ))}
        </>
      )}
    </div>
  );
}
