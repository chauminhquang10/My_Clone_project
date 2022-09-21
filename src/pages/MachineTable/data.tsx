import { StateFullIcon, StateLowIcon, StateNormalIcon } from '@/assets';
import { blue, green } from '@ant-design/colors';
import { CheckCircleFilled } from '@ant-design/icons';
import { Badge, Space, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

export interface DataType {
  key: string;
  device: string;
  status: string;
  reserved: ReserveStatus;
}

enum ReserveStatus {
  full = 'Đầy',
  normal = 'Bình thường',
  low = 'Thấp',
}

const icons = {
  [ReserveStatus.full]: StateFullIcon,
  [ReserveStatus.low]: StateLowIcon,
  [ReserveStatus.normal]: StateNormalIcon,
};

export const unitColumns: ColumnsType<DataType> = [
  {
    title: <div style={{ textAlign: 'center' }}>Thiết bị</div>,
    dataIndex: 'device',
    width: '33%',
  },
  {
    title: <div style={{ textAlign: 'center' }}>Tình trạng vật lý</div>,
    className: 'column-money',
    dataIndex: 'status',
    width: '33%',
  },
  {
    title: <div style={{ textAlign: 'center' }}>Dự trữ</div>,
    dataIndex: 'reserved',
    width: '33%',
    render: (value: ReserveStatus) => {
      const src = icons[value];

      return (
        <Space size={10}>
          <img src={src} />
          <Typography.Text style={{ fontSize: 16 }} strong>
            {value}
          </Typography.Text>
        </Space>
      );
    },
  },
];

export const data: API.TransactionResponse[] = [
  {
    id: '1',
    accountNumber: '8132234',
    customerName: 'phuc',
    type: 'CARD_LOGIN',
    status: 'UNKNOWN',
    error: 'AMOUNT_LIMITED_BY_CUSTOMER',
    time: new Date().toDateString(),
  },
];

export const transactionColumns: ColumnsType<DataType> = [
  {
    title: <Typography.Text>Mã giao dịch</Typography.Text>,
    dataIndex: 'device',
    width: '140px',
  },
  {
    title: <Typography.Text>Loại giao dịch</Typography.Text>,
    className: 'column-money',
    dataIndex: 'status',
    width: '292px',
  },
  {
    title: <Typography.Text>Thời gian giao dịch</Typography.Text>,
    dataIndex: 'reserved',
    width: '180px',
  },
  {
    title: <Typography.Text>Mã khách hàng</Typography.Text>,
    dataIndex: 'reserved',
    width: '140px',
  },
  {
    title: <Typography.Text>Tên khách hàng</Typography.Text>,
    dataIndex: 'reserved',
    width: '292px',
  },
  {
    title: <Typography.Text>Trạng thái</Typography.Text>,
    dataIndex: 'reserved',
    width: '180px',
    render: (value) => {
      return (
        <Space size={10}>
          <CheckCircleFilled style={{ color: green[6] }} />
          {value}
        </Space>
      );
    },
  },
  {
    title: <Typography.Text>Mã lỗi</Typography.Text>,
    dataIndex: 'reserved',
    width: '140px',
  },
];

export const informationColumns: ColumnsType<DataType> = [
  {
    title: (
      <Typography.Text>
        Tình trạng vật lý <Badge count={99} style={{ fontSize: 12, backgroundColor: blue[5] }} />
      </Typography.Text>
    ),
    dataIndex: 'device',
    width: '33%',
  },
  {
    title: (
      <Typography.Text>
        Tình trạng vật lý <Badge count={99} style={{ fontSize: 12, backgroundColor: green[5] }} />
      </Typography.Text>
    ),
    className: 'column-money',
    dataIndex: 'status',
    width: '33%',
  },
  {
    title: (
      <Typography.Text>
        Tình trạng vật lý <Badge count={99} style={{ fontSize: 12 }} />
      </Typography.Text>
    ),
    dataIndex: 'reserved',
    width: '33%',
  },
];

export const machineSeriesColumns: ColumnsType<DataType> = [
  {
    title: <Typography.Text>Loại thiết bị</Typography.Text>,
    dataIndex: 'device',
    width: '33%',
  },
  {
    title: (
      <Typography.Text>
        Tình trạng vật lý
        <span style={{ background: 'rgba(255, 255, 255, 1e-05)' }}>
          <Badge count={99} style={{ fontSize: 12, backgroundColor: green[6] }} />
        </span>
      </Typography.Text>
    ),
    className: 'column-money',
    dataIndex: 'status',
    width: '33%',
  },
  {
    title: (
      <Typography.Text>
        Tình trạng vật lý <Badge count={99} style={{ fontSize: 12 }} />
      </Typography.Text>
    ),
    dataIndex: 'reserved',
    width: '33%',
  },
];
