import { Button, Card, DatePicker, Row, Space, Typography } from 'antd';

interface FilterOverlayProps {
  onClick: () => void;
  setFromDate: (date: string) => void;
  setToDate: (date: string) => void;
}

export default function FilterOverlay({ onClick, setFromDate, setToDate }: FilterOverlayProps) {
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
          <DatePicker
            onChange={(_, dateString) => {
              setFromDate(dateString);
            }}
          />
          <DatePicker
            onChange={(_, dateString) => {
              setToDate(dateString);
            }}
          />
        </Space>
      </Row>
    </Card>
  );
}
