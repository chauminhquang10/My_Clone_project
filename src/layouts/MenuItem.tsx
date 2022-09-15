import type { MenuDataItem } from '@ant-design/pro-components';
import type { ReactNode } from 'react';
import { memo } from 'react';
import { Link } from 'umi';
import { icons } from './data';

interface MenuItemProps {
  menuItemProps: MenuDataItem & {
    isUrl: boolean;
    onClick: () => void;
  };
  defaultDom: ReactNode;
}

function MenuItem({ defaultDom, menuItemProps }: MenuItemProps) {
  if (menuItemProps.isUrl || !menuItemProps.path || location.pathname === menuItemProps.path) {
    return defaultDom;
  }
  const Icon: string = icons[menuItemProps.icon as keyof typeof icons];

  return (
    <>
      <img src={Icon} />
      <Link to={menuItemProps.path} style={{ marginLeft: 16 }}>
        {menuItemProps.name}
      </Link>
    </>
  );
}

export default memo(MenuItem);
