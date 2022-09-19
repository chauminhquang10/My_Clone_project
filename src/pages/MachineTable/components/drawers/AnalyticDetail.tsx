import { EditOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Drawer, Dropdown, Form, Input, Row, Table, Typography } from 'antd';
import { useState } from 'react';
import { data, informationColumns } from '../../data';
import DeclareMachineForm from '../forms/DeclareMachineForm';
import FilterOverlay from './FilterOverlay';
import styles from './analyticDetail.less';
import TransactionTable from '../tables/TransactionTable';
import StatusTag from '@/components/TableProperties/StatusTag';
import { ColumnsType } from 'antd/lib/table';
import { genKey } from '@/utils';

interface AnaylyticDetailProps {
  open: boolean;
  handleClose: () => void;
}

interface EmployeeList {
  key: string;
  order: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

const columns: ColumnsType<EmployeeList> = [
  {
    title: 'STT',
    dataIndex: 'order',
    align: 'center',
  },
  {
    title: <div style={{ textAlign: 'center' }}>Họ và tên</div>,
    dataIndex: 'fullName',
  },
  {
    title: <div style={{ textAlign: 'center' }}>Email</div>,
    dataIndex: 'email',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    align: 'center',
  },
];

const dataMock: EmployeeList[] = [
  {
    email: 'email@gmail.com',
    fullName: 'Nguyen Van A',
    key: genKey(),
    order: '9999',
    phoneNumber: '095 165 8795',
  },
];

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
              <Typography.Title level={4}>Chi tiết hoạt động</Typography.Title>
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
                title="Thông tin máy"
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
                    <Form.Item name="Tên máy" label="Tên máy">
                      <Input disabled placeholder={'example'} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Terminal ID" label="Terminal ID">
                      <Input disabled placeholder={'example'} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Địa chỉ IP" label="Địa chỉ IP">
                      <Input disabled placeholder={'example'} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Tình trạng máy" label="Tình trạng máy">
                      <StatusTag type="defaultStatus" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="Địa chỉ máy" label="Địa chỉ máy">
                      <Input disabled placeholder={'example'} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Mã - Tên đơn vị" label="Mã - Tên đơn vị">
                      <Input disabled placeholder={'example'} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Địa chỉ đơn vị" label="Địa chỉ đơn vị">
                      <Input disabled placeholder={'example'} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="Danh sách nhân viên quản lý"
                      label="Danh sách nhân viên quản lý"
                    >
                      <Table columns={columns} dataSource={dataMock} pagination={false} bordered />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              <Card
                title="Thông tin hoạt động"
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
