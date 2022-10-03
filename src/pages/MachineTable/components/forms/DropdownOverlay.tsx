import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import type { ChangeEventHandler, ReactNode } from 'react';
import { memo } from 'react';
import { FormattedMessage } from 'umi';
import styles from './editMachine.less';

interface DropdownOverlayProps {
  query: string | undefined;
  menu: ReactNode;
  disabledLoadMore?: boolean;
  onLoadMore?: () => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function DropdownOverlay({
  query,
  menu,
  disabledLoadMore,
  onLoadMore,
  onChange,
}: DropdownOverlayProps) {
  return (
    <div className={styles.overlay}>
      <Input
        size="small"
        className={styles.searchInput}
        placeholder="Search"
        prefix={<SearchOutlined className={styles.searchIcon} />}
        onChange={onChange}
        value={query}
      />
      {menu}
      <Button disabled={disabledLoadMore} type="text" icon={<PlusOutlined />} onClick={onLoadMore}>
        <FormattedMessage id="loadMore" />
      </Button>
    </div>
  );
}

export default memo(DropdownOverlay);
