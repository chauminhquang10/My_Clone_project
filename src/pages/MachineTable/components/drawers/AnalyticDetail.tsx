import { EditOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import {
  // Badge,
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Form,
  Input,
  Row,
  Table,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import DeclareMachineForm from '../forms/DeclareMachineForm';
import FilterOverlay from './FilterOverlay';
import styles from './analyticDetail.less';
import TransactionTable from '../tables/TransactionTable';
import type { ColumnsType } from 'antd/lib/table';
import { openNotification } from '@/utils';
import { useRequest } from 'umi';
// import { blue, green } from '@ant-design/colors';
import api from '@/services/STM-APIs';
import MachineStatusTag from '@/components/Common/MachineStatusTag';

interface AnaylyticDetailProps {
  open: boolean;
  handleClose: () => void;
  runGetAllActivity: () => void;
}

interface AnaylyticDetailProps {
  currentEntity: API.StmInfoResponse | undefined;
}
//-------------------- User Management ---------------
const columns: ColumnsType<API.UserResponse> = [
  {
    title: 'STT',
    align: 'center',
    render: (_, __, index) => {
      return <div style={{ textAlign: 'center' }}>{index + 1}</div>;
    },
  },
  {
    title: <div style={{ textAlign: 'center' }}>Họ và tên</div>,
    dataIndex: 'name',
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

//------------ information activity -------------------------
// const informationColumns: ColumnsType<API.TransactionResponse> = [
//   {
//     title: (
//       <Typography.Text>
//         Loại hoạt động <Badge count={99} style={{ fontSize: 12, backgroundColor: blue[6] }} />
//       </Typography.Text>
//     ),
//     dataIndex: 'device',
//     width: '33%',
//   },
//   {
//     title: (
//       <Typography.Text>
//         Thành công
//         <span style={{ background: 'rgba(255, 255, 255, 1e-05)' }}>
//           <Badge count={99} style={{ fontSize: 12, backgroundColor: green[6] }} />
//         </span>
//       </Typography.Text>
//     ),
//     className: 'column-money',
//     dataIndex: 'status',
//     width: '33%',
//   },
//   {
//     title: (
//       <Typography.Text>
//         Thất bại <Badge count={99} style={{ fontSize: 12 }} />
//       </Typography.Text>
//     ),
//     dataIndex: 'reserved',
//     width: '33%',
//   },
// ];

export default function AnaylyticDetail({
  handleClose,
  open,
  currentEntity,
  runGetAllActivity,
}: AnaylyticDetailProps) {
  //-------------------- Get transaction details --------------------------------
  //-------------------- Detail Transaction --------------------------------
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [detailTransaction, setDetailTransaction] = useState<
    API.TransactionResponse[] | undefined
  >();
  console.log('toDate: ', toDate, 'fromDate: ', fromDate);

  const { run: getDetailTransaction } = useRequest(
    (params: API.getTransactionsParams) => api.TransactionController.getTransactions(params),
    {
      manual: true,
      onSuccess: (res) => {
        if (!res) {
          openNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau');
        } else {
          setDetailTransaction(res.items);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
  useEffect(() => {
    const params: API.getTransactionsParams = {
      machineId: currentEntity?.id || '',
      from: fromDate,
      to: toDate,
    };
    getDetailTransaction(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEntity, fromDate, toDate]);

  //-------------------- detail Machine --------------------------------
  const [detailMachine, setDetailMachine] = useState<API.StmDetailResponse | undefined>();
  console.log(detailMachine);

  const { run: getDetailMachine } = useRequest(
    (params: API.getMachineDetailParams) => api.STMController.getMachineDetail(params),
    {
      manual: true,
      onSuccess: (res) => {
        if (!res) {
          openNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau');
        } else {
          setDetailMachine(res);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  useEffect(() => {
    const params: API.getMachineDetailParams = {
      id: currentEntity?.id || '',
    };
    getDetailMachine(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEntity]);

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [transacationTableOpen, setTransactionTableOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdownOpen = () => {
    setDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (!open) setDropdownOpen(open);
  }, [open]);

  return (
    <>
      <DeclareMachineForm
        onVisibleChange={handleUpdateModalVisible}
        onCancel={() => {
          handleUpdateModalVisible(false);
        }}
        visible={updateModalVisible}
        {...detailMachine}
        handleClose={handleClose}
        getAllMachine={runGetAllActivity}
      />
      <TransactionTable
        width="1400px"
        visible={transacationTableOpen}
        onVisibleChange={setTransactionTableOpen}
        onFinish={async () => {
          setTransactionTableOpen(false);
          return false;
        }}
        detailTransaction={detailTransaction}
      />
      <>
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
                  overlay={
                    <FilterOverlay
                      onClick={handleDropdownClose}
                      setFromDate={setFromDate}
                      setToDate={setToDate}
                    />
                  }
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
                      <Input disabled placeholder={currentEntity?.name} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Terminal ID" label="Terminal ID">
                      <Input disabled placeholder={currentEntity?.terminalId} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Địa chỉ IP" label="Địa chỉ IP">
                      <Input disabled placeholder={currentEntity?.ipAddress} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Tình trạng máy" label="Tình trạng máy">
                      {/* <StatusTag type={currentEntity?.status} /> */}
                      <MachineStatusTag
                        type={
                          currentEntity?.status as
                            | 'UNKNOWN'
                            | 'IN_SERVICE'
                            | 'OUT_OF_SERVICE'
                            | 'OFFLINE'
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="Địa chỉ máy" label="Địa chỉ máy">
                      <Input disabled placeholder={detailMachine?.address} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Mã - Tên đơn vị" label="Mã - Tên đơn vị">
                      <Input
                        disabled
                        placeholder={`${detailMachine?.managementUnit?.code} - ${detailMachine?.managementUnit?.name}`}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Địa chỉ đơn vị" label="Địa chỉ đơn vị">
                      <Input disabled placeholder={detailMachine?.managementUnit?.address} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="Danh sách nhân viên quản lý"
                      label="Danh sách nhân viên quản lý"
                    >
                      <Table
                        columns={columns}
                        dataSource={detailMachine?.managementUsers}
                        pagination={false}
                        bordered
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              {/* <Card
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
                <Table
                  columns={informationColumns}
                  dataSource={detailTransaction}
                  pagination={false}
                  bordered
                />
              </Card> */}
            </Form>
          </div>
        </Drawer>
      </>
    </>
  );
}
