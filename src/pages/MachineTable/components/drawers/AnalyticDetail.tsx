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
import { FormattedMessage, useIntl, useModel, useRequest } from 'umi';
import api from '@/services/STM-APIs';
import MachineStatusTag from '@/components/Common/MachineStatusTag';
import { informationColumns } from '../../data';

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
    title: <FormattedMessage id="tableColumn_indexTitle" />,
    align: 'center',
    render: (_, __, index) => {
      return <div style={{ textAlign: 'center' }}>{index + 1}</div>;
    },
  },
  {
    title: (
      <div style={{ textAlign: 'center' }}>
        <FormattedMessage id="fullName" />
      </div>
    ),
    dataIndex: 'name',
  },
  {
    title: <div style={{ textAlign: 'center' }}>Email</div>,
    dataIndex: 'email',
  },
  {
    title: <FormattedMessage id="phoneNumber" />,
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

export default function AnalyticDetail({
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
  const intl = useIntl();

  const { run: getDetailTransaction } = useRequest(
    (params: API.getTransactionsParams) => api.TransactionController.getTransactions(params),
    {
      manual: true,
      onSuccess: (res) => {
        if (!res) {
          openNotification('error', intl.formatMessage({ id: 'notificationError' }));
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
          openNotification('error', intl.formatMessage({ id: 'notificationError' }));
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
  const { initialState } = useModel('@@initialState');

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
              <Typography.Title level={4}>
                <FormattedMessage id="actiStatisDetail.title" />
              </Typography.Title>
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
                    <FormattedMessage id="filter" />
                  </Button>
                </Dropdown>
              </div>
            </div>
            <Form layout="vertical" className={styles.drawerBody}>
              <Card
                title={<FormattedMessage id="actiStatisDetail.cardTitle" />}
                extra={
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => {
                      handleUpdateModalVisible(true);
                    }}
                    disabled={initialState?.currentRoles?.update_machine !== true}
                  >
                    {intl.formatMessage({ id: 'edit' })}
                  </Button>
                }
                size="small"
                className={styles.myCard}
                style={{ borderRadius: 12 }}
              >
                <Row gutter={24} align="bottom">
                  <Col span={12}>
                    <Form.Item name="Tên máy" label={<FormattedMessage id="machineName" />}>
                      <Input disabled placeholder={currentEntity?.name} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Terminal ID" label="Terminal ID">
                      <Input disabled placeholder={currentEntity?.terminalId} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Địa chỉ IP" label={<FormattedMessage id="ipAddress" />}>
                      <Input disabled placeholder={currentEntity?.ipAddress} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="Tình trạng máy"
                      label={<FormattedMessage id="actiStatisDetail.machineStatus" />}
                    >
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
                    <Form.Item
                      name="Địa chỉ máy"
                      label={<FormattedMessage id="actiStatisDetail.machineAddress" />}
                    >
                      <Input disabled placeholder={detailMachine?.address} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="Mã - Tên đơn vị"
                      label={<FormattedMessage id="machine-drawer.code-unitName" />}
                    >
                      <Input
                        disabled
                        placeholder={`${detailMachine?.managementUnit?.code} - ${detailMachine?.managementUnit?.name}`}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Địa chỉ đơn vị" label={<FormattedMessage id="address" />}>
                      <Input disabled placeholder={detailMachine?.managementUnit?.address} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="Danh sách nhân viên quản lý"
                      label={<FormattedMessage id="declare-unit.tableTitle" />}
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
              <Card
                title="Trasaction configuration"
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
                    Detail
                  </Button>
                }
              >
                <Table
                  columns={informationColumns}
                  dataSource={detailTransaction}
                  pagination={false}
                  bordered
                />
              </Card>
            </Form>
          </div>
        </Drawer>
      </>
    </>
  );
}
