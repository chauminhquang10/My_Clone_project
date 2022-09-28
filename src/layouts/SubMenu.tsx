import { genKey } from '@/utils';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import cx from 'classnames';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useCallback, useMemo } from 'react';
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
  showSubNav?: string[];
  onClick?: (path: string) => () => void;
  currentRoute: string | undefined;
  setCurrentRoute: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
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
  disabled,
}: SubMenuProps) {
  const showSubnav = useMemo(() => showSubNav?.includes(path), [showSubNav, path]);
  const handleNavigate = useCallback(() => {
    if (!disabled) {
      history.push(path);
      setCurrentRoute(path);
    }
  }, [setCurrentRoute, path, disabled]);

  const handleClick = useMemo(
    () => (!children ? handleNavigate : onClick?.(path)),
    [children, handleNavigate, onClick, path],
  );

  return (
    <div
      className={cx({
        [styles.menuContainer]: !isChildren,
        [styles.collapsed]: collapsed,
      })}
    >
      <div
        className={cx(styles.menuItem, {
          [styles.child]: isChildren,
          [styles.collapsed]: collapsed,
          [styles.single]: !children && !isChildren,
          [styles.current]: currentRoute === path,
          [styles.disabled]: disabled,
        })}
        onClick={handleClick}
      >
        <>
          {!isChildren && !collapsed && (
            <div style={{ opacity: children ? 1 : 0 }}>
              {showSubnav ? (
                <CaretUpFilled className={styles.arrow} />
              ) : (
                <CaretDownFilled className={styles.arrow} />
              )}
            </div>
          )}
          {icon}
          {!collapsed && (
            <Typography.Text
              className={styles.title}
              ellipsis={{
                tooltip: { children: <FormattedMessage id={`menu.${id}`} />, placement: 'right' },
              }}
            >
              <FormattedMessage id={`menu.${id}`} />
            </Typography.Text>
          )}
        </>
      </div>
      {showSubnav && (
        <>
          {children?.map((child) => (
            <SubMenu
              {...child}
              id={`${id}.${child.id}`}
              collapsed={collapsed}
              key={genKey()}
              currentRoute={currentRoute}
              setCurrentRoute={setCurrentRoute}
              disabled={disabled}
              isChildren
            />
          ))}
        </>
      )}
    </div>
  );
}
