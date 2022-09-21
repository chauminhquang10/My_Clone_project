import { EditOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Drawer, Form, Input, Row, Space, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import DeclareMachineSeriesForm from './DeclareMachineSeriesForm';
import styles from './machineDetailForm.less';

interface DrawerSectionProps {
  open: boolean;
  handleClose: () => void;
}

interface DataType {
  deviceType: string;
  unit: string;
  capacity: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Loại thiết bị',
    dataIndex: 'deviceType',
  },
  {
    title: 'Đơn vị tính',
    dataIndex: 'unit',
  },
  {
    title: 'Sức chứa tối thiểu',
    dataIndex: 'capacity',
  },
];

export default function ConfigMachineDrawer({ handleClose, open }: DrawerSectionProps) {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  return (
    <>
      <DeclareMachineSeriesForm
        onFinish={async () => {
          setUpdateModalOpen(false);
          return false;
        }}
        onVisibleChange={setUpdateModalOpen}
        visible={updateModalOpen}
        width="934px"
      />
      <>
        <Drawer width={880} open={open} onClose={handleClose}>
          <div className={styles.drawerSectionContainer}>
            <div className={styles.drawerHeader} style={{ flex: 'unset' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography.Title level={4}>Chi tiết cấu hình dòng máy</Typography.Title>
                <Button
                  icon={<EditOutlined color="#434343" />}
                  className={styles.btnItem}
                  onClick={() => setUpdateModalOpen(true)}
                >
                  <span className={styles.btnGroupTitle}>Chỉnh sửa</span>
                </Button>
              </div>
            </div>
            <Form layout="vertical" className={styles.drawerBody}>
              <Card
                title="Thông tin dòng máy"
                size="small"
                className={styles.myCard}
                style={{ borderRadius: 12 }}
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item name="Machine Type" label="Loại máy">
                      <Input disabled placeholder="Smart Teller Machine" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="machineType" label="Dòng máy">
                      <Input disabled placeholder="Dòng máy" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Card
                title={
                  <Space size={10} align="center">
                    Cấu hình
                    <Badge count={99} />
                  </Space>
                }
                size="small"
                style={{ borderRadius: 12 }}
                bodyStyle={{ padding: 0 }}
              >
                <Table columns={columns} dataSource={undefined} pagination={false} bordered />
              </Card>
            </Form>
            1
          </div>
        </Drawer>
      </>
    </>
  );
}
