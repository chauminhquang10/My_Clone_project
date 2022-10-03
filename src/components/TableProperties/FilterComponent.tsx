import { Button, Radio, Row, Space } from 'antd';
import type { FilterDropdownProps } from 'antd/lib/table/interface';
import type { ReactNode } from 'react';
import { useState } from 'react';
import style from './style.less';

type FilterType = {
  id: number;
  text: ReactNode;
  value: string;
}[];

interface FilterComponentProps extends FilterDropdownProps {
  listFilter: FilterType;
  setParamFilter: (value: string | number | undefined) => void;
}

function FilterComponent({ listFilter, setParamFilter, confirm }: FilterComponentProps) {
  const [value, setValue] = useState();
  return (
    <div className={style['filter-group']}>
      <Radio.Group
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={style['check-box-group']}
        value={value}
      >
        {listFilter.map((item) => {
          return (
            <Row key={item.id} className={style['item-dropdown-filter']}>
              <Radio value={item.value}>{item.text}</Radio>
            </Row>
          );
        })}
      </Radio.Group>
      <Space className={style['btn-group']}>
        <Button
          className={style['reset-btn']}
          onClick={() => {
            setValue(undefined);
          }}
        >
          Xóa
        </Button>
        <Button
          className={style['reset-btn']}
          onClick={() => {
            setParamFilter(value);
            confirm({ closeDropdown: true });
          }}
          type="primary"
        >
          OK
        </Button>
      </Space>
    </div>
  );
}

export default FilterComponent;
