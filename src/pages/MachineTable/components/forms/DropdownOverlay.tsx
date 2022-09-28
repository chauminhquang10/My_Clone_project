import { SearchOutlined } from '@ant-design/icons';
import { useDebounce } from 'ahooks';
import { Input } from 'antd';
import type { ChangeEventHandler, ReactNode } from 'react';
import { memo, useCallback, useState } from 'react';
import styles from './editMachine.less';

interface DropdownOverlayProps {
  users: API.UserResponse[] | undefined;
  menu: ReactNode;
}

function DropdownOverlay({ users, menu }: DropdownOverlayProps) {
  const [search, setSearch] = useState<string>();
  const searchDebounce = useDebounce(search, { wait: 500 });

  if (searchDebounce) {
    // eslint-disable-next-line no-param-reassign
    users?.filter((user) =>
      user.name?.toLocaleLowerCase()?.includes(searchDebounce.toLocaleLowerCase()),
    );
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  return (
    <div className={styles.overlay}>
      <Input
        size="small"
        className={styles.searchInput}
        placeholder="Search"
        prefix={<SearchOutlined className={styles.searchIcon} />}
        onChange={handleChange}
        value={search}
      />
      {menu}
    </div>
  );
}

export default memo(DropdownOverlay);
