import { ModalForm } from "@ant-design/pro-components";
import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import closeIcon from "@/assets/images/svg/icon/close-icon.svg";
import styles from "./UpdateUnitForm.less";
const { Option } = Select;

type CreateFormProps = {
    title: string;
    width: string;
    visible: boolean;
    onVisibleChange: (value: boolean) => void;
    onFinish: (values: Partial<API.RuleListItem>) => Promise<boolean>;
};

const UpdateUnitForm: React.FC<CreateFormProps> = ({
    title,
    width,
    visible,
    onVisibleChange,
    onFinish,
}) => {
    const [form] = Form.useForm();

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

            <Row gutter={[24, 24]}>
                <Col span={12}>
                    <Form.Item name="unitId" label="Mã đơn vị">
                        <Input placeholder={"Nhập mã đơn vị"} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="staffName" label="Tên đơn vị">
                        <Input placeholder={"Nhập tên đơn vị"} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="area" label="Khu vực">
                        <Select placeholder="Chọn khu vực">
                            <Option value="private">Private</Option>
                            <Option value="public">Public</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="city" label="Tỉnh/Thành phố">
                        <Select placeholder="Chọn Tỉnh/Thành phố">
                            <Option value="private">Private</Option>
                            <Option value="public">Public</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="district" label="Quận/Huyện">
                        <Select placeholder="Chọn Quận/Huyện">
                            <Option value="private">Private</Option>
                            <Option value="public">Public</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="subDistrict" label="Phường/Xã">
                        <Select placeholder="Chọn Phường/Xã">
                            <Option value="private">Private</Option>
                            <Option value="public">Public</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="address" label="Tên đường, số nhà">
                        <Input placeholder={"example"} />
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
                    Lưu
                </Button>
            </Row>
        </ModalForm>
    );
};

export default UpdateUnitForm;
