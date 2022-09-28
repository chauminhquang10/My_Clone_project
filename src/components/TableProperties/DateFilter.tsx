import { Space } from 'antd';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;
function DateFilter() {
  return (
    <Space>
      <RangePicker
        allowClear={true}
        onCalendarChange={(_, dateStrings) => {
          console.log(
            new Date(dateStrings[0]).toDateString(),
            new Date(dateStrings[1]).toDateString(),
          );
        }}
      />
    </Space>
  );
}

export default DateFilter;
