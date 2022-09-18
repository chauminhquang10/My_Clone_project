import { EditOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Drawer, Dropdown, Form, Input, Row, Table, Typography } from 'antd';
import { useState } from 'react';
import { data, informationColumns } from '../../data';
import DeclareMachineForm from '../forms/DeclareMachineForm';
import FilterOverlay from './FilterOverlay';
import styles from './analyticDetail.less';
import TransactionTable from '../tables/TransactionTable';

interface AnaylyticDetailProps {
  open: boolean;
  handleClose: () => void;
}

export default function AnaylyticDetail({ handleClose, open }: AnaylyticDetailProps) {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [transacationTableOpen, setTransactionTableOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdownOpen = () => {
    setDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      <DeclareMachineForm
        width="934px"
        visible={updateModalVisible}
        onVisibleChange={handleUpdateModalVisible}
        onFinish={async () => {
          handleUpdateModalVisible(false);
          return false;
        }}
      />
      <TransactionTable
        width="1400px"
        visible={transacationTableOpen}
        onVisibleChange={setTransactionTableOpen}
        onFinish={async () => {
          setTransactionTableOpen(false);
          return false;
        }}
      />
      <PageContainer>
        <Drawer
          width={880}
          open={open}
          onClose={handleClose}
          bodyStyle={{ padding: '0 20px' }}
          headerStyle={{ border: 'none' }}
        >
          <div className={styles.drawerSectionContainer}>
            <div className={styles.drawerHeader}>
              <Typography.Title level={4}>STM Ngô Gia Tự</Typography.Title>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Input prefix={<SearchOutlined />} height={32} style={{ width: '40%' }} />
                <Dropdown
                  open={dropdownOpen}
                  onOpenChange={handleDropdownOpen}
                  trigger={['click']}
                  overlay={<FilterOverlay onClick={handleDropdownClose} />}
                >
                  <Button style={{ borderRadius: 4 }} icon={<FilterOutlined />}>
                    Bộ lọc
                  </Button>
                </Dropdown>
              </div>
            </div>
            <Form layout="vertical" className={styles.drawerBody}>
              <Card
                title="Thông tin thiết bị"
                extra={
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => {
                      handleUpdateModalVisible(true);
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                }
                size="small"
                className={styles.myCard}
                style={{ borderRadius: 12 }}
              >
                <Row gutter={24} align="bottom">
                  <Col span={12}>
                    <Form.Item name="Dòng máy" label="Dòng máy">
                      <Input disabled placeholder={'example'} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Seri máy" label="Seri máy">
                      <Input disabled placeholder={'example'} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Loại khoá" label="Loại khoá">
                      <Input disabled placeholder={'example'} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Cổng" label="Cổng">
                      <Input disabled placeholder={'example'} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="Protocol" label="Protocol">
                      <Input disabled placeholder={'example'} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Master (A)/(B) Key" label="Master (A)/(B) Key">
                      <Input disabled placeholder={'example'} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="MAC" label="MAC">
                      <Input disabled placeholder={'example'} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="Tài khoản hạch toán USD" label="Tài khoản hạch toán USD">
                      <Input disabled placeholder={'example'} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Card
                title="Thông tin phần cứng"
                size="small"
                style={{ borderRadius: 12 }}
                bodyStyle={{ padding: 0 }}
                extra={
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setTransactionTableOpen(true);
                    }}
                  >
                    Xem chi tiết
                  </Button>
                }
              >
                <Table columns={informationColumns} dataSource={data} pagination={false} bordered />
              </Card>
            </Form>
          </div>
        </Drawer>
      </PageContainer>
    </>
  );
}
