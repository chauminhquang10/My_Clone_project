import { formatTime } from '@/utils';
import { Button, Space } from 'antd';
import { DatePicker } from 'antd';
// import type { RangePickerProps } from 'antd/lib/date-picker';
import type { FilterDropdownProps } from 'antd/lib/table/interface';
import moment from 'moment';
// import type { Moment } from 'moment';
import { useState } from 'react';
// import type { Component, LegacyRef } from 'react';
import style from './style.less';
// import { CommonPickerMethods } from 'antd/lib/date-picker/generatePicker/interface';
const { RangePicker } = DatePicker;
interface DateFilterProp extends FilterDropdownProps {
  setDateFilter: (from: string | undefined, to: string | undefined) => void;
}
function DateFilter({ setDateFilter, confirm }: DateFilterProp) {
  const [dateTo, setDateTo] = useState<Date>();
  const [dateFrom, setDateFrom] = useState<Date>();
  return (
    <div>
      <Space>
        <RangePicker
          allowClear={true}
          onCalendarChange={(_, dateStrings) => {
            if (dateStrings[1]) setDateTo(new Date(dateStrings[1]));
            if (dateStrings[0]) setDateFrom(new Date(dateStrings[0]));
          }}
          value={[moment(dateFrom), moment(dateTo)]}
        />
      </Space>
      <Space className={style['btn-group']}>
        <Button
          className={style['reset-btn']}
          onClick={() => {
            setDateFrom(undefined);
            setDateTo(undefined);
            setDateFilter(undefined, undefined);
          }}
        >
          Xóa
        </Button>
        <Button
          className={style['reset-btn']}
          onClick={() => {
            console.log(dateTo, dateFrom);
            if (dateFrom && dateTo) setDateFilter(formatTime(dateFrom), formatTime(dateTo));
            confirm({
              closeDropdown: true,
            });
          }}
          type="primary"
        >
          OK
        </Button>
      </Space>
    </div>
  );
}

export default DateFilter;
