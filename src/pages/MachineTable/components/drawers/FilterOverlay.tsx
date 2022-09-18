import { Button, Card, DatePicker, DatePickerProps, Row, Space, Typography } from 'antd';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

interface FilterOverlayProps {
  onClick: () => void;
}

export default function FilterOverlay({ onClick }: FilterOverlayProps) {
  return (
    <Card
      size="small"
      title="Bộ lọc"
      extra={
        <Button type="link" onClick={onClick}>
          Bỏ lọc
        </Button>
      }
    >
      <Row style={{ marginBottom: 5 }}>
        <Typography.Text>Thời gian hoạt động</Typography.Text>
      </Row>
      <Row>
        <Space size={2}>
          <DatePicker onChange={onChange} />
          <DatePicker onChange={onChange} />
        </Space>
      </Row>
    </Card>
  );
}
