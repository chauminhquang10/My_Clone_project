import MachineStatusTag from '@/components/Common/MachineStatusTag';
import ModalCustom from '@/components/FormCustom/ModalCustom';
import { TextCell, UserCellStatus, UserStatusCell } from '@/components/TableProperties/TableCell';
import {
  deleteManagementUnit,
  getManagementUnit,
  updateManagementUnit,
} from '@/services/STM-APIs/ManagementUnitController';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
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
import React, { useState } from 'react';
import { useRequest } from 'umi';
import styles from './UnitDetailDrawer.less';
import UpdateUnitForm from './UpdateUnitForm';

import { useIntl, FormattedMessage } from 'umi';

const INITIAL_VALIDATE_DELETE = {
  enableDeleteBtn: true,
  tooltipMsg: 'Xóa',
};

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
  children?: React.ReactNode;
  runGetAllManagementUnits: () => void;
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
  runGetAllManagementUnits,
}) => {
  const intl = useIntl();

  const unitListColumns: ColumnsType<Required<API.UserResponse>> = [
    {
      title: <FormattedMessage id="detailDrawer_userCard_columnGroup_staffName" />,

      dataIndex: 'name',
      ellipsis: true,
      key: 'name',
      width: '22%',
      sorter: (a, b) => a.name.length - b.name.length,
      align: 'left',
      render: (_, { avatar, name }) => <StaffNameComponent avatar={avatar} name={name} />,
    },
    {
      title: <FormattedMessage id="detailDrawer_userCard_columnGroup_staffCode" />,
      dataIndex: 'staffId',
      key: 'staffId',
      width: '17%',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: <FormattedMessage id="detailDrawer_userCard_columnGroup_staffPhoneNumber" />,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '17%',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: <FormattedMessage id="detailDrawer_userCard_columnGroup_staffEmail" />,
      dataIndex: 'email',
      ellipsis: true,
      key: 'email',
      width: '22%',
      align: 'center',
      render: (text) => <span style={{ color: '#1890FF' }}>{text}</span>,
    },
    {
      title: <FormattedMessage id="detailDrawer_userCard_columnGroup_staffStatus" />,
      key: 'status',
      dataIndex: 'status',
      width: '22%',
      align: 'center',
      render: (_, { status }) => <UserStatusCell status={UserCellStatus[status]} />,
    },
  ];

  const machineListColumns: ColumnsType<Required<API.StmInfoResponse>> = [
    {
      title: <FormattedMessage id="detailDrawer_machineCard_columnGroup_machineName" />,
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
      title: <FormattedMessage id="detailDrawer_machineCard_columnGroup_machineCode" />,
      dataIndex: 'terminalId',
      key: 'terminalId',
      width: '30%',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: <FormattedMessage id="detailDrawer_machineCard_columnGroup_machineIPAddress" />,
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: '30%',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: <FormattedMessage id="detailDrawer_machineCard_columnGroup_machineStatus" />,
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

  // xử lí trạng thái nút xóa (disable, enable) kèm message khi hiện Tooltip
  const [validateDeleteObj, setValidateDeleteObj] = useState(INITIAL_VALIDATE_DELETE);

  const { data: unitDetail } = useRequest<API.ResponseBaseManagementUnitDetailResponse>(
    () => {
      return getManagementUnit({ unitId: currentUnit?.id?.toString() || '' });
    },
    {
      onSuccess(data) {
        if (
          data?.machines &&
          data?.users &&
          (data?.machines?.length > 0 || data?.users?.length > 0)
        ) {
          setValidateDeleteObj({
            enableDeleteBtn: false,
            tooltipMsg: 'Chưa thể xoá. Người dùng hoặc máy chưa có đơn vị quản lý',
          });
        }
      },
      refreshDeps: [currentUnit],
    },
  );

  const handleUpdateUnit = async (fields: API.UpdateManagementUnitRequest) => {
    const hide = message.loading('Configuring...');
    try {
      const res = await updateManagementUnit(
        { unitId: unitDetail?.id?.toString() || '' },
        { ...fields },
      );
      hide();
      if (res.code === 700) {
        message.error(`${fields.name} ${fields.code} ${fields.address} đã được sử dụng`);
        return;
      }

      message.success(
        intl.formatMessage({
          id: 'updateUnit_successStatus_message',
        }),
      );
      handleUpdateModalVisible(false);
      setShowDetail(false);
      runGetAllManagementUnits();
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
      runGetAllManagementUnits();
      hide();
      message.success(
        intl.formatMessage({
          id: 'deleteUnit_successStatus_message',
        }),
      );

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
      title: intl.formatMessage({
        id: 'cancel',
      }),
      type: 'out-line',
      action: () => {
        setOpenConfirmModal(false);
      },
    },
    {
      title: intl.formatMessage({
        id: 'form_buttonGroup_confirmButton_title',
      }),
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
                <h4 className={styles.drawerHeaderTitle}>
                  <FormattedMessage id="detailDrawer_title" />
                </h4>
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
                      <span className={styles.btnGroupTitle}>
                        <FormattedMessage id="buttonGroup_edit" />
                      </span>
                    </Button>
                  </Col>

                  <Col>
                    <Tooltip placement="left" title={validateDeleteObj.tooltipMsg}>
                      <Button
                        disabled={!validateDeleteObj.enableDeleteBtn}
                        className={`${styles.btnItem}  ${
                          validateDeleteObj.enableDeleteBtn ? styles.btnDeleteItem : ''
                        }`}
                        onClick={() => setOpenConfirmModal(true)}
                      >
                        <DeleteOutlined
                          style={validateDeleteObj.enableDeleteBtn ? { color: '#FF4D4F' } : {}}
                        />
                      </Button>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={[0, 24]}>
              <Col span={24}>
                <Card
                  title={intl.formatMessage({
                    id: 'detailDrawer_infoCard_title',
                  })}
                  size="small"
                  className={styles.myCard}
                >
                  <Row gutter={24}>
                    <Col span={8}>
                      <Form.Item
                        name="unitName"
                        label={intl.formatMessage({
                          id: 'detailDrawer_infoCard_unitCodeName',
                        })}
                      >
                        <Input disabled placeholder={unitDetail?.code} />
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name="address"
                        label={intl.formatMessage({
                          id: 'detailDrawer_infoCard_unitAddress',
                        })}
                      >
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
                  title={() =>
                    intl.formatMessage({
                      id: 'detailDrawer_userCard_title',
                    })
                  }
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
                  title={() =>
                    intl.formatMessage({
                      id: 'detailDrawer_machineCard_title',
                    })
                  }
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
          title={intl.formatMessage({
            id: 'unitForm_updateForm_title',
          })}
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
