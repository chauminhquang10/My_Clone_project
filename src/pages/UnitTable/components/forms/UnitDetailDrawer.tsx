import MachineStatusTag from '@/components/Common/MachineStatusTag';
import ModalCustom from '@/components/FormCustom/ModalCustom';
import { TextCell, UserCellStatus, UserStatusCell } from '@/components/TableProperties/TableCell';
import {
  deleteManagementUnit,
  getManagementUnit,
  updateManagementUnit,
} from '@/services/STM-APIs/ManagementUnitController';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import {
  Avatar,
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Space,
  Table,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { MutableRefObject } from 'react';
import React, { useState } from 'react';
import { useRequest } from 'umi';
import styles from './UnitDetailDrawer.less';
import UpdateUnitForm from './UpdateUnitForm';

type ButtonType = {
  title: string;
  action: () => void;
  type: 'out-line' | 'warning' | 'confirm';
};

type UnitDrawerProps = {
  showDetail: boolean;
  setShowDetail: (value: boolean) => void;
  currentUnit: API.ManagementUnitResponse | undefined;
  setCurrentUnit: (value: API.ManagementUnitResponse | undefined) => void;
  detailActionRef: MutableRefObject<ActionType | undefined>;
  children?: React.ReactNode;
};

type StaffNameProps = {
  avatar: string;
  name: string;
};

const StaffNameComponent: React.FC<StaffNameProps> = ({ name, avatar }) => {
  return (
    <div className={styles.staffNameCell}>
      <div className={styles.staffUnitInfo}>
        <Avatar src={avatar} size={24} />
        <TextCell>{name}</TextCell>
      </div>
    </div>
  );
};

const UnitDetailDrawer: React.FC<UnitDrawerProps> = ({
  showDetail,
  setShowDetail,
  currentUnit,
  setCurrentUnit,
  detailActionRef,
}) => {
  const unitListColumns: ColumnsType<Required<API.UserResponse>> = [
    {
      title: 'Tên nhân viên',
      dataIndex: 'name',
      ellipsis: true,
      key: 'name',
      width: '22%',
      sorter: (a, b) => a.name.length - b.name.length,
      align: 'left',
      render: (_, { avatar, name }) => <StaffNameComponent avatar={avatar} name={name} />,
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'staffId',
      key: 'staffId',
      width: '17%',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '17%',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
      key: 'email',
      width: '22%',
      align: 'center',
      render: (text) => <span style={{ color: '#1890FF' }}>{text}</span>,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      width: '22%',
      align: 'center',
      render: (_, { status }) => <UserStatusCell status={UserCellStatus[status]} />,
    },
  ];

  const machineListColumns: ColumnsType<Required<API.StmInfoResponse>> = [
    {
      title: 'Tên máy',
      dataIndex: 'name',
      key: 'name',
      width: '18%',
      align: 'left',
      render: (text) => (
        <div className={styles.staffNameCell}>
          <TextCell>{text}</TextCell>
        </div>
      ),
    },
    {
      title: 'Terminal ID',
      dataIndex: 'terminalId',
      key: 'terminalId',
      width: '30%',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Địa chỉ IP',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: '30%',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Tình trạng',
      key: 'status',
      dataIndex: 'status',
      width: '22%',
      align: 'center',
      render: (_, { status }) => <MachineStatusTag type={status} />,
    },
  ];

  // xử  lí trạng thái của form chỉnh sửa
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  // kiểm tra có thể xóa hay không
  const [canRemoveUnit, setCanRemoveUnit] = useState<boolean>(true);

  const { data: unitDetail } = useRequest<API.ResponseBaseManagementUnitDetailResponse>(
    () => {
      return getManagementUnit({ unitId: currentUnit?.id?.toString() || '' });
    },
    {
      onSuccess(data) {
        if (data?.machines.length > 0 || data?.users.length > 0) {
          setCanRemoveUnit(false);
        }
      },
      refreshDeps: [currentUnit],
    },
  );

  const handleUpdateUnit = async (fields: API.UpdateManagementUnitRequest) => {
    const hide = message.loading('Configuring...');
    try {
      await updateManagementUnit({ unitId: unitDetail?.id?.toString() || '' }, { ...fields });
      hide();
      message.success('Chỉnh sửa đơn vị thành công');
      handleUpdateModalVisible(false);
      setShowDetail(false);
      detailActionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
  };

  const handleRemoveUnit = async () => {
    const hide = message.loading('Loading...');
    try {
      await deleteManagementUnit({ unitId: unitDetail?.id?.toString() || '' });
      setShowDetail(false);
      detailActionRef.current?.reloadAndRest?.();
      hide();
      message.success('Xoá đơn vị thành công');
      return true;
    } catch (error) {
      hide();
      message.error('Delete failed, please try again');
      return false;
    }
  };

  //------------- Declare Modal --------------------------------
  //------------- Button List --------------------

  const buttonList: ButtonType[] = [
    {
      title: 'Huỷ bỏ',
      type: 'out-line',
      action: () => {
        setOpenConfirmModal(false);
      },
    },
    {
      title: 'Xác nhận',
      type: 'warning',
      action: () => {
        handleRemoveUnit();
      },
    },
  ];

  //------------- Description List --------------------------------
  const descriptionList: string[] = [
    `Bạn có chắc chắn muốn xóa ${currentUnit?.code} - ${currentUnit?.name}?`,
  ];

  return (
    <>
      <Drawer
        width={880}
        open={showDetail}
        onClose={() => {
          setShowDetail(false);
          setCurrentUnit(undefined);
        }}
        className={styles.myDrawer}
        closable={true}
        headerStyle={{ border: 'none' }}
      >
        <Form layout="vertical" hideRequiredMark>
          <Space size={12} direction={'vertical'} style={{ width: '100%' }}>
            <Row>
              <Col span={15}>
                <h4 className={styles.drawerHeaderTitle}>Chi tiết đơn vị</h4>
              </Col>
              <Col span={9}>
                <Row
                  justify="end"
                  align="middle"
                  gutter={8}
                  className={styles.myDrawerHeaderBtnGroup}
                >
                  <Col>
                    <Button
                      icon={<EditOutlined color="#434343" />}
                      className={styles.btnItem}
                      onClick={() => handleUpdateModalVisible(true)}
                    >
                      <span className={styles.btnGroupTitle}>Chỉnh sửa</span>
                    </Button>
                  </Col>
                  <Col>
                    <Tooltip
                      placement="left"
                      title={
                        canRemoveUnit
                          ? 'Xóa'
                          : 'Chưa thể xoá. Người dùng hoặc máy chưa có đơn vị quản lý'
                      }
                    >
                      <Button
                        className={styles.btnItem}
                        onClick={() => setOpenConfirmModal(true)}
                        disabled={canRemoveUnit ? false : true}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={[0, 24]}>
              <Col span={24}>
                <Card title="Thông tin đơn vị" size="small" className={styles.myCard}>
                  <Row gutter={24}>
                    <Col span={8}>
                      <Form.Item name="unitName" label="Mã - Tên đơn vị">
                        <Input disabled placeholder={unitDetail?.code} />
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item name="address" label="Địa chỉ đơn vị">
                        <Input disabled placeholder={unitDetail?.address} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col span={24}>
                <Table
                  columns={unitListColumns as ColumnsType<API.UserResponse>}
                  dataSource={unitDetail?.users}
                  bordered
                  title={() => 'Danh sách người dùng'}
                  className={styles.myTable}
                  pagination={false}
                  scroll={{ y: 200 }}
                />
              </Col>

              <Col span={24}>
                <Table
                  columns={machineListColumns as ColumnsType<API.StmInfoResponse>}
                  dataSource={unitDetail?.machines}
                  bordered
                  title={() => 'Danh sách máy quản lý'}
                  className={styles.myTable}
                  pagination={false}
                  scroll={{ y: 200 }}
                />
              </Col>
            </Row>
          </Space>
        </Form>
      </Drawer>

      {updateModalVisible && (
        <UpdateUnitForm
          title="Chỉnh sửa đơn vị quản lý"
          width="934px"
          visible={updateModalVisible}
          unitDetail={unitDetail as API.ManagementUnitDetailResponse}
          onVisibleChange={handleUpdateModalVisible}
          onFinish={async (value) => {
            await handleUpdateUnit(value as API.UpdateManagementUnitRequest);
          }}
        />
      )}

      {openConfirmModal && (
        <ModalCustom
          openConfirmModal={openConfirmModal}
          setOpenConfirmModal={setOpenConfirmModal}
          buttonList={buttonList}
          descriptionList={descriptionList}
          title="Cảnh báo"
          icon={<ExclamationCircleOutlined style={{ color: '#FFC53D', fontSize: '22px' }} />}
        />
      )}
    </>
  );
};

export default UnitDetailDrawer;
