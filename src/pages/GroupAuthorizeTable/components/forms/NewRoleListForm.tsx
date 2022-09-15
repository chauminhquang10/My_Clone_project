import { ModalForm } from "@ant-design/pro-components";
import React, { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Tree } from "antd";
import closeIcon from "@/assets/images/svg/icon/close-icon.svg";
import type { DataNode, TreeProps } from "antd/es/tree";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import plusIcon from "@/assets/images/svg/icon/plus-icon.svg";
import minusIcon from "@/assets/images/svg/icon/minus-icon.svg";
import styles from "./NewRoleListForm.less";

type CreateFormProps = {
    title: string;
    width: string;
    visible: boolean;
    onVisibleChange: (value: boolean) => void;
    onFinish: (values: Partial<API.RoleGroupResponse>) => Promise<boolean>;
};

const NewUnitForm: React.FC<CreateFormProps> = ({
    title,
    width,
    visible,
    onVisibleChange,
    onFinish,
}) => {
    // xử  lí icon mở rộng tree
    const [expandTreeIndexes, setExpandTreeIndexes] = useState<string[]>([]);

    // xử lí các quyền được chọn
    const [checkedRoles, setCheckedRoles] = useState<(number | string)[]>([]);

    // xử lí check all
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);

    const treeData: DataNode[] = [
        {
            title: "Quản trị máy",
            key: "machine",
            switcherIcon: (
                <>
                    {expandTreeIndexes.includes("machine") ? (
                        <img src={minusIcon} />
                    ) : (
                        <img src={plusIcon} />
                    )}
                </>
            ),
            children: [
                {
                    title: "con 1",
                    key: 1,
                },
                {
                    title: "con 2",
                    key: 2,
                },
            ],
        },
        {
            title: "Giám sát camera",
            key: "camera",
            switcherIcon: (
                <>
                    {expandTreeIndexes.includes("camera") ? (
                        <img src={minusIcon} />
                    ) : (
                        <img src={plusIcon} />
                    )}
                </>
            ),
            children: [
                {
                    title: "Log hoạt động",
                    key: 3,
                },
                {
                    title: "Danh sách giao dịch",
                    key: 4,
                },
            ],
        },
        {
            title: "Quản trị người dùng",
            key: "user",
            switcherIcon: (
                <>
                    {expandTreeIndexes.includes("user") ? (
                        <img src={minusIcon} />
                    ) : (
                        <img src={plusIcon} />
                    )}
                </>
            ),
            children: [
                {
                    title: "Log hoạt động",
                    key: 5,
                },
                {
                    title: "Danh sách giao dịch",
                    key: 6,
                },
            ],
        },
        {
            title: "Quản lý hiển thị",
            key: "vision",
            switcherIcon: (
                <>
                    {expandTreeIndexes.includes("vision") ? (
                        <img src={minusIcon} />
                    ) : (
                        <img src={plusIcon} />
                    )}
                </>
            ),
            children: [
                {
                    title: "Log hoạt động",
                    key: 7,
                },
                {
                    title: "Danh sách giao dịch",
                    key: 8,
                },
            ],
        },
    ];

    const onCheck: TreeProps["onCheck"] = (checkedKeys) => {
        const checkedRolesKey = checkedKeys as (number | string)[];
        const checkRolesLength = checkedRolesKey.length;

        setCheckedRoles(checkedRolesKey);

        // tạm thời fake data, sửa lại tree data length cho đúng
        // tree data length là tính tổng số phần tử trong mảng api trả về kể cả key của thằng cha
        // fetch api r tính toán r gán vào đây
        setIndeterminate(!!checkRolesLength && checkRolesLength < 12);
        setCheckAll(checkRolesLength === 12);
    };

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        // điều kiện true thì sử dụng mảng giá trị toàn bị key của data từ api trả về
        // fetch api r tính toán r gán vào đây
        setCheckedRoles(e.target.checked ? [1, 2, 3, 4, 5, 6, 7, 8] : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
        setIndeterminate(false);
        setCheckAll(false);
        setCheckedRoles([]);
        setExpandTreeIndexes([]);
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

            <Row gutter={[0, 15]}>
                <Col span={24}>
                    <Form.Item name="roleGroupName" label="Tên nhóm quyền">
                        <Input placeholder={"Quản trị máy & camera"} />
                    </Form.Item>
                </Col>

                <Col
                    span={24}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                    }}
                >
                    <Row justify="space-between" align="middle">
                        <span>Danh sách quyền</span>
                        <Checkbox
                            indeterminate={indeterminate}
                            checked={checkAll}
                            onChange={onCheckAllChange}
                            className={styles.myAllCheckBox}
                        />
                    </Row>

                    <Row>
                        <Tree
                            checkedKeys={checkedRoles}
                            checkable
                            selectable={false}
                            multiple
                            onCheck={onCheck}
                            treeData={treeData}
                            height={274}
                            className={styles.myRoleGroupTree}
                            onExpand={(_, { node, expanded }) => {
                                if (expanded)
                                    setExpandTreeIndexes([
                                        ...expandTreeIndexes,
                                        node.key.toString(),
                                    ]);
                                else {
                                    const newExpandTreeIndexes =
                                        expandTreeIndexes.filter(
                                            (item) =>
                                                item !== node.key.toString()
                                        );
                                    setExpandTreeIndexes(newExpandTreeIndexes);
                                }
                            }}
                        />
                    </Row>
                </Col>
            </Row>

            <Row
                align="middle"
                justify="end"
                style={{ marginTop: "28px", gap: "16px" }}
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

export default NewUnitForm;
