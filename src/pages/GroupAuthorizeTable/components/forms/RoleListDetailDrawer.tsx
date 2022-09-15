import {
    CloseOutlined,
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
    Modal,
    Tooltip,
    Space,
    Avatar,
    Tag,
    Badge,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";

import StatusTag from "./StatusTag";
import styles from "./RoleListDetailDrawer.less";
import userDetailIcon from "@/assets/images/svg/icon/top-right-arrow.svg";
import UpdateRoleListForm from "./UpdateRoleListForm";

interface UserRoleGroupDataType {
    staffId: string;
    staffName: string;
    avatar: string;
    phoneNumber: string;
    email: string;
    status: string;
}

type RoleListDetailDrawerProps = {
    showDetail: boolean;
    setShowDetail: (value: boolean) => void;
    currentRow: API.RoleGroupResponse | undefined;
    setCurrentRow: (value: API.RoleGroupResponse | undefined) => void;
    children?: React.ReactNode;
};

type StaffNameProps = {
    avatar: string;
    name: string;
};

interface UserRoleGroupListTableTitleProps {
    title: string;
    quantity: number;
}

const StaffNameComponent: React.FC<StaffNameProps> = ({ name, avatar }) => {
    return (
        <div className={styles.staffNameCell}>
            <div className={styles.staffUserInfo}>
                <Avatar src={avatar} size={24} />
                <span>{name}</span>
            </div>
            <div className={styles.visibleUserDetail}>
                <Tooltip placement="bottom" title={"Chi tiết người dùng"}>
                    <img src={userDetailIcon} />
                </Tooltip>
            </div>
        </div>
    );
};

const RoleListDetailDrawer: React.FC<RoleListDetailDrawerProps> = ({
    showDetail,
    setShowDetail,
    currentRow,
    setCurrentRow,
}) => {
    const userRoleGroupColumns: ColumnsType<UserRoleGroupDataType> = [
        {
            title: "Mã NV",
            dataIndex: "staffId",
            key: "staffId",
            width: "15%",
            align: "center",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Họ và tên",
            dataIndex: "staffName",
            key: "staffName",
            width: "25%",
            sorter: (a, b) => a.staffName.length - b.staffName.length,
            align: "left",
            render: (_, { avatar, staffName }) => (
                <StaffNameComponent avatar={avatar} name={staffName} />
            ),
        },

        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "15%",
            align: "center",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "25%",
            align: "left",
            render: (text) => <span style={{ color: "#1890FF" }}>{text}</span>,
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            width: "20%",
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

    const userRoleGroupData: UserRoleGroupDataType[] = [
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
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "9",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "10",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "11",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "12",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "13",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "14",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "15",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "16",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "17",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "18",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "19",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "20",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "21",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "22",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "23",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "24",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "25",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "26",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
        {
            staffName: "Nguyễn Văn UI",
            avatar: "https://joeschmoe.io/api/v1/random",
            staffId: "27",
            phoneNumber: "0946 123 123",
            email: "quangdeptrai@gm.com",
            status: "ACTIVE",
        },
    ];

    const UserRoleGroupListTableTitle: React.FC<
        UserRoleGroupListTableTitleProps
    > = ({ title, quantity }) => {
        return (
            <div className={styles.machineListTableTitle}>
                <span>{title}</span>
                <Badge
                    count={quantity}
                    style={{ backgroundColor: "#E6F7FF", color: "#1890FF" }}
                />
            </div>
        );
    };

    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

    // xử  lí trạng thái của form chỉnh sửa
    const [updateModalVisible, handleUpdateModalVisible] =
        useState<boolean>(false);

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
                                        Chi tiết nhóm quyền
                                    </h4>
                                </Col>
                                <Col span={9}>
                                    <Row
                                        justify="end"
                                        className={
                                            styles.myDrawerHeaderBtnGroup
                                        }
                                    >
                                        <Button
                                            icon={
                                                <EditOutlined color="#434343" />
                                            }
                                            className={styles.btnItem}
                                            onClick={() =>
                                                handleUpdateModalVisible(true)
                                            }
                                        >
                                            <span
                                                className={styles.btnGroupTitle}
                                            >
                                                Chỉnh sửa
                                            </span>
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>

                            <Row gutter={[0, 20]}>
                                <Col
                                    span={12}
                                    className={styles.roleGroupContainer}
                                >
                                    <Form.Item
                                        name="roleGroupName"
                                        label="Tên nhóm quyền"
                                    >
                                        <Input
                                            disabled
                                            placeholder={"example"}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Card
                                        title="Quyền tương ứng"
                                        size="small"
                                        className={styles.myCard}
                                    >
                                        <Tag>Tên quyền</Tag>
                                        <Tag>Tên quyền</Tag>
                                        <Tag>Tên quyền</Tag>
                                    </Card>
                                </Col>

                                <Col span={24}>
                                    <Table
                                        columns={userRoleGroupColumns}
                                        dataSource={userRoleGroupData}
                                        bordered
                                        title={() => (
                                            <UserRoleGroupListTableTitle
                                                title="Nhân viên sở hữu nhóm quyền"
                                                quantity={99}
                                            />
                                        )}
                                        className={styles.myTable}
                                        pagination={false}
                                        scroll={{ y: 560 }}
                                    />
                                </Col>
                            </Row>
                        </Space>
                    </Form>
                )}
            </Drawer>

            <UpdateRoleListForm
                title="Chỉnh sửa nhóm quyền"
                width="934px"
                visible={updateModalVisible}
                onVisibleChange={handleUpdateModalVisible}
                onFinish={async () => {
                    // const success = await handleAdd(value as API.RoleGroupResponse);
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

            <Modal
                footer={null}
                centered
                closable={false}
                visible={openConfirmModal}
                className={styles.myConfirmModal}
            >
                <Col span={24}>
                    <Row>
                        <Col span={2}>
                            <ExclamationCircleOutlined
                                style={{ color: "#FFC53D", fontSize: "22px" }}
                            />
                        </Col>
                        <Col span={22}>
                            <Row align="middle" justify="space-between">
                                <h3 className={styles.lockModalTitle}>
                                    Tạm khoá người dùng
                                </h3>
                                <CloseOutlined
                                    style={{
                                        fontSize: "16px",
                                        color: "rgba(0, 0, 0, 0.45)",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setOpenConfirmModal(false)}
                                />
                            </Row>
                            <Row>
                                <span className={styles.lockModalDesc}>
                                    Bạn có chắc chắn muốn tạm khóa mã nhân viên
                                    - tên nhân viên?
                                </span>
                                <span className={styles.lockModalDesc}>
                                    Người dùng này sẽ không thể truy cập vào hệ
                                    thống.
                                </span>
                            </Row>
                        </Col>
                    </Row>
                    <Row
                        align="middle"
                        justify="end"
                        style={{ gap: "8px", marginTop: "24px" }}
                    >
                        <Button
                            className={styles.cancelLockModalButton}
                            size="large"
                            onClick={() => setOpenConfirmModal(false)}
                        >
                            Huỷ bỏ
                        </Button>
                        <Button
                            className={styles.submitLockModalButton}
                            size="large"
                            onClick={() => setOpenConfirmModal(false)}
                        >
                            Xác nhận
                        </Button>
                    </Row>
                </Col>
            </Modal>
        </>
    );
};

export default RoleListDetailDrawer;
