import { ModalForm } from "@ant-design/pro-components";
import {
    DeleteOutlined,
    UploadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import type { SelectProps } from "antd";
import { Skeleton } from "antd";
import {
    Avatar,
    Button,
    Col,
    Form,
    Input,
    message,
    Row,
    Select,
    Tree,
    Upload,
} from "antd";
import closeIcon from "@/assets/images/svg/icon/close-icon.svg";
import styles from "./NewUserForm.less";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { DataNode } from "antd/lib/tree";

const { Option } = Select;

type CreateFormProps = {
    title: string;
    width: string;
    visible: boolean;
    onVisibleChange: (value: boolean) => void;
    onFinish: (values: Partial<API.UserResponse>) => Promise<boolean>;
};

interface ItemProps {
    label: string;
    value: string;
}

const options: ItemProps[] = [];

const NewUserForm: React.FC<CreateFormProps> = ({
    title,
    width,
    visible,
    onVisibleChange,
    onFinish,
}) => {
    // xử lí upload ảnh trên frontend
    const [loadingImage, setLoadingImage] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>("");

    const [value, setValue] = useState(["a10", "c12", "h17", "j19", "k20"]);

    // xử lí hiện/ẩn arrow icon của select list
    const [arrowVisible, setArrowVisible] = useState(true);

    const [form] = Form.useForm();

    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    //# check loại file khi upload file
    const handleBeforeUpload = (file: RcFile) => {
        const isCorrectFileType =
            file.type === "image/png" || file.type === "image/jpeg";

        if (!isCorrectFileType) {
            message.error(`${file.name} không đúng định dạng file`);
            return Upload.LIST_IGNORE;
        }

        const isLessThan5M = file.size / 1024 / 1024 < 5;

        if (!isLessThan5M) {
            message.error(`${file.name} dung lượng vượt quá 5MB`);
            return Upload.LIST_IGNORE;
        }
        return isCorrectFileType && isLessThan5M;
    };

    const handleChange: UploadProps["onChange"] = async (
        info: UploadChangeParam<UploadFile>
    ) => {
        if (info.file.status === "uploading") {
            setLoadingImage(true);
            return;
        }
        if (info.file.status === "done") {
            if (!info.file.url && !info.file.preview) {
                info.file.preview = await getBase64(
                    info.file.originFileObj as RcFile
                );
            }
            setLoadingImage(false);
            setImageUrl(info.file.url || (info.file.preview as string));
        }
    };

    const handleRemoveAvatar = () => {
        setImageUrl("");
    };

    const treeData: DataNode[] = [
        {
            title: "parent 1",
            key: "1",
            isLeaf: true,
        },
        {
            title: "parent 2",
            key: "2",
            isLeaf: true,
        },
        {
            title: "parent 3",
            key: "3",
            isLeaf: true,
        },
        {
            title: "parent 4",
            key: "4",
            isLeaf: true,
        },
    ];

    const dropdownRender = () => <Tree treeData={treeData} checkable />;

    const selectProps: SelectProps = {
        mode: "multiple",
        value,
        options,
        onChange: (newValue: string[]) => {
            setValue(newValue);
        },
        placeholder: "Chọn nhóm quyền",
        maxTagCount: "responsive",
        showArrow: arrowVisible,
        showSearch: false,
        onDropdownVisibleChange: (open) =>
            open ? setArrowVisible(false) : setArrowVisible(true),
        dropdownRender,
    };

    const onReset = () => {
        form.resetFields();
        onVisibleChange(false);
    };

    return (
        <ModalForm
            form={form}
            width={width}
            visible={visible}
            onVisibleChange={onVisibleChange}
            onFinish={onFinish}
            modalProps={{
                centered: true,
                closable: false,
                destroyOnClose: true,
                onCancel: () => console.log("run"),
                className: styles.myModalForm,
            }}
            submitTimeout={2000}
        >
            <Row
                align="top"
                justify="space-between"
                className={styles.modalFormHeader}
            >
                <Col>
                    <p className={styles.modalTitle}>{title}</p>
                </Col>
                <Col>
                    <span onClick={onReset} className={styles.closeIcon}>
                        <img src={closeIcon} />
                    </span>
                </Col>
            </Row>

            <p className={styles.avatarTitle}>Ảnh đại diện</p>

            <Row align="middle" justify="start" style={{ gap: "16px" }}>
                <Col>
                    {!loadingImage ? (
                        <Avatar
                            size={64}
                            src={
                                imageUrl ? (
                                    imageUrl
                                ) : (
                                    <Avatar size={64} icon={<UserOutlined />} />
                                )
                            }
                        />
                    ) : (
                        <Skeleton.Avatar
                            active={true}
                            shape={"circle"}
                            size={64}
                        />
                    )}
                </Col>
                <Col>
                    <Row style={{ gap: "8px" }}>
                        <Col>
                            <Upload
                                name="avatar"
                                showUploadList={false}
                                beforeUpload={(file: RcFile) =>
                                    handleBeforeUpload(file)
                                }
                                onChange={handleChange}
                                maxCount={1}
                            >
                                <Button
                                    icon={<UploadOutlined />}
                                    className={styles.uploadButton}
                                >
                                    Tải ảnh lên
                                </Button>
                            </Upload>
                        </Col>
                        <Col>
                            <Button
                                icon={<DeleteOutlined />}
                                className={styles.deleteButton}
                                onClick={handleRemoveAvatar}
                            >
                                <span>Xóa ảnh</span>
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
                <Col span={12}>
                    <Form.Item
                        name="staffId"
                        label="Mã nhân viên"
                        rules={[
                            {
                                required: true,
                                message: "Please input your ma nhan vien",
                            },
                        ]}
                    >
                        <Input placeholder={"Nhập mã nhân viên"} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="staffName" label="Tên nhân viên">
                        <Input placeholder={"Nhập tên nhân viên"} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="phoneNumber" label="Số điện thoại">
                        <Input placeholder={"Nhập số điện thoại"} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="email" label="Email">
                        <Input placeholder={"Nhập email"} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="unitId" label="Mã - Tên đơn vị">
                        <Select placeholder="Chọn đơn vị">
                            <Option value="private">Private</Option>
                            <Option value="public">Public</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="unitAddress" label="Địa chỉ đơn vị">
                        <Input disabled placeholder={"Chọn đơn vị"} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="roleGroup" label="Nhóm quyền">
                        <Select placeholder="Chọn nhóm quyền">
                            <Option value="private">Private</Option>
                            <Option value="public">Public</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="roles" label="Quyền tương ứng">
                        <Select {...selectProps} />
                    </Form.Item>
                </Col>
            </Row>

            <Row
                align="middle"
                justify="end"
                style={{ marginTop: "24px", gap: "16px" }}
            >
                <Button
                    className={styles.cancelButton}
                    size="large"
                    onClick={onReset}
                >
                    Huỷ bỏ
                </Button>
                <Button
                    className={styles.submitButton}
                    size="large"
                    htmlType="submit"
                >
                    Hoàn tất
                </Button>
            </Row>
        </ModalForm>
    );
};

export default NewUserForm;
