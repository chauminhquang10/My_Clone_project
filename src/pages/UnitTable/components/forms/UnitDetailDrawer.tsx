import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    UnlockOutlined,
} from "@ant-design/icons";
import {
    Col,
    Drawer,
    Form,
    Input,
    Row,
    Button,
    Card,
    Table,
    Tooltip,
    Space,
    Avatar,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";

import StatusTag from "@/components/TableProperties/StatusTag";
import styles from "./UnitDetailDrawer.less";
import UpdateUnitForm from "./UpdateUnitForm";
import ModalCustom from "@/components/FormCustom/ModalCustom";
import { TextCell } from "@/components/TableProperties/TableCell";

interface UnitDataType {
    staffId: string;
    avatar: string;
    staffName: string;
    phoneNumber: string;
    email: string;
    status: string;
}

interface MachineDataType {
    machineId: string;
    machineName: string;
    IPAddress: string;
    machineAddress: string;
    status: string;
    managerName: string;
}

type ButtonType = {
    title: string;
    action: () => void;
    type: "out-line" | "warning" | "confirm";
};

type UnitDrawerProps = {
    showDetail: boolean;
    setShowDetail: (value: boolean) => void;
    currentRow: API.ManagementUnitResponse | undefined;
    setCurrentRow: (value: API.ManagementUnitResponse | undefined) => void;
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
    currentRow,
    setCurrentRow,
}) => {
    const unitListColumns: ColumnsType<UnitDataType> = [
        {
            title: "Tên nhân viên",
            dataIndex: "staffName",
            key: "staffName",
            width: "22%",
            sorter: (a, b) => a.staffName.length - b.staffName.length,
            align: "left",
            render: (_, { avatar, staffName }) => (
                <StaffNameComponent avatar={avatar} name={staffName} />
            ),
        },
        {
            title: "Mã nhân viên",
            dataIndex: "staffId",
            key: "staffId",
            width: "17%",
            align: "center",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "17%",
            align: "center",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "22%",
            align: "center",
            render: (text) => <span style={{ color: "#1890FF" }}>{text}</span>,
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            width: "22%",
            align: "center",
            render: (_, { status }) => (
                <StatusTag
                    title={status}
                    icon={<UnlockOutlined />}
                    type="ACTIVE"
                />
            ),
        },
    ];

    const machineListColumns: ColumnsType<MachineDataType> = [
        {
            title: "Tên máy",
            dataIndex: "machineName",
            key: "machineName",
            width: "18%",
            align: "left",
            render: (text) => (
                <div className={styles.staffNameCell}>
                    <TextCell>{text}</TextCell>
                </div>
            ),
        },
        {
            title: "Terminal ID",
            dataIndex: "machineId",
            key: "machineId",
            width: "15%",
            align: "center",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Địa chỉ IP",
            dataIndex: "IPAddress",
            key: "IPAddress",
            width: "15%",
            align: "center",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Tình trạng",
            key: "status",
            dataIndex: "status",
            width: "22%",
            align: "center",
            render: (_, { status }) => (
                <StatusTag
                    title={status}
                    icon={<UnlockOutlined />}
                    type="DISABLE"
                />
            ),
        },
        {
            title: "Địa chỉ máy",
            dataIndex: "machineAddress",
            key: "IPAddress",
            width: "15%",
            align: "center",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Người quản lý",
            dataIndex: "managerName",
            key: "managerName",
            width: "15%",
            align: "center",
            render: (text) => <span>{text}</span>,
        },
    ];

    const unitListData: UnitDataType[] = [
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "1",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "2",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "3",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn A",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "4",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "5",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "6",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "7",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "8",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
    ];

    const machineListData: MachineDataType[] = [
        {
            machineName: "Test Machine",
            machineId: "1",
            IPAddress: "Test IP",
            status: "IN SERVICE",
            machineAddress: "Test Machine",
            managerName: "Test Manager",
        },
        {
            machineName: "Test Machine",
            machineId: "2",
            IPAddress: "Test IP",
            status: "IN SERVICE",
            machineAddress: "Test Machine",
            managerName: "Test Manager",
        },
        {
            machineName: "Test Machine",
            machineId: "3",
            IPAddress: "Test IP",
            status: "IN SERVICE",
            machineAddress: "Test Machine",
            managerName: "Test Manager",
        },
        {
            machineName: "Test Machine",
            machineId: "4",
            IPAddress: "Test IP",
            status: "IN SERVICE",
            machineAddress: "Test Machine",
            managerName: "Test Manager",
        },
        {
            machineName: "Test Machine",
            machineId: "5",
            IPAddress: "Test IP",
            status: "OUT OF SERVICE",
            machineAddress: "Test Machine",
            managerName: "Test Manager",
        },
        {
            machineName: "Test Machine",
            machineId: "6",
            IPAddress: "Test IP",
            status: "OUT OF SERVICE",
            machineAddress: "Test Machine",
            managerName: "Test Manager",
        },
    ];
    // xử  lí trạng thái của form chỉnh sửa
    const [updateModalVisible, handleUpdateModalVisible] =
        useState<boolean>(false);
    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
    //------------- Declare Modal --------------------------------
    //------------- Button List --------------------

    const buttonList: ButtonType[] = [
        {
            title: "Huỷ bỏ",
            type: "out-line",
            action: () => {
                setOpenConfirmModal(false);
            },
        },
        {
            title: "Xác nhận",
            type: "warning",
            action: () => {},
        },
    ];

    //------------- Description List --------------------------------

    const descriptionList: string[] = [
        "Bạn có chắc chắn muốn tạm khóa ?",
        "Người dùng này sẽ không thể truy cập vào hệ thống.",
    ];

    return (
        <>
            <Drawer
                width={880}
                open={showDetail}
                onClose={() => {
                    setCurrentRow(undefined);
                    setShowDetail(false);
                }}
                className={styles.myDrawer}
                closable={true}
                headerStyle={{ border: "none" }}
            >
                {currentRow?.name && (
                    <Form layout="vertical" hideRequiredMark>
                        <Space size={12} direction={"vertical"}>
                            <Row>
                                <Col span={15}>
                                    <h4 className={styles.drawerHeaderTitle}>
                                        Chi tiết đơn vị
                                    </h4>
                                </Col>
                                <Col span={9}>
                                    <Row
                                        justify="end"
                                        align="middle"
                                        gutter={8}
                                        className={
                                            styles.myDrawerHeaderBtnGroup
                                        }
                                    >
                                        <Col>
                                            <Button
                                                icon={
                                                    <EditOutlined color="#434343" />
                                                }
                                                className={styles.btnItem}
                                                onClick={() =>
                                                    handleUpdateModalVisible(
                                                        true
                                                    )
                                                }
                                            >
                                                <span
                                                    className={
                                                        styles.btnGroupTitle
                                                    }
                                                >
                                                    Chỉnh sửa
                                                </span>
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Tooltip
                                                placement="left"
                                                title="Prompt Text"
                                            >
                                                <Button
                                                    className={styles.btnItem}
                                                    onClick={() =>
                                                        setOpenConfirmModal(
                                                            true
                                                        )
                                                    }
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
                                    <Card
                                        title="Thông tin đơn vị"
                                        size="small"
                                        className={styles.myCard}
                                    >
                                        <Row gutter={24}>
                                            <Col span={8}>
                                                <Form.Item
                                                    name="unitName"
                                                    label="Mã - Tên đơn vị"
                                                >
                                                    <Input
                                                        disabled
                                                        placeholder={"example"}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={16}>
                                                <Form.Item
                                                    name="address"
                                                    label="Địa chỉ đơn vị"
                                                >
                                                    <Input
                                                        disabled
                                                        placeholder={"example"}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>

                                <Col span={24}>
                                    <Table
                                        columns={unitListColumns}
                                        dataSource={unitListData}
                                        bordered
                                        title={() => "Danh sách người dùng"}
                                        className={styles.myTable}
                                        pagination={false}
                                        scroll={{ y: 200 }}
                                    />
                                </Col>

                                <Col span={24}>
                                    <Table
                                        columns={machineListColumns}
                                        dataSource={machineListData}
                                        bordered
                                        title={() => "Danh sách máy quản lý"}
                                        className={styles.myTable}
                                        pagination={false}
                                        scroll={{ y: 200 }}
                                    />
                                </Col>
                            </Row>
                        </Space>
                    </Form>
                )}
            </Drawer>

            <UpdateUnitForm
                title="Chỉnh sửa đơn vị quản lý"
                width="934px"
                visible={updateModalVisible}
                onVisibleChange={handleUpdateModalVisible}
                onFinish={async () => {
                    // const success = await handleAdd(value as API.RuleListItem);
                    // if (success) {
                    //   handleUpdateModalVisible(false);
                    //   if (actionRef.current) {
                    //     actionRef.current.reload();
                    //   }
                    //   return true;
                    // }
                    handleUpdateModalVisible(false);
                    return false;
                }}
            />

            <ModalCustom
                openConfirmModal={openConfirmModal}
                setOpenConfirmModal={setOpenConfirmModal}
                buttonList={buttonList}
                descriptionList={descriptionList}
                title="Tạm khoá người dùng"
                icon={
                    <ExclamationCircleOutlined
                        style={{ color: "#FFC53D", fontSize: "22px" }}
                    />
                }
            />
        </>
    );
};

export default UnitDetailDrawer;
