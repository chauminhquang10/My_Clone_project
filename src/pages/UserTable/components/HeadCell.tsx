import React from 'react';

import style from './style.less';

type HeadCellProps = {
  children: React.ReactNode | string;
};

export default function HeadCell({ children }: HeadCellProps) {
  return <div className={style['header-cell']}>{children}</div>;
}
