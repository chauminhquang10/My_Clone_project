import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";
import styles from "./style.less";

type ButtonType = {
    title: string;
    action: () => void;
    type: "out-line" | "warning" | "confirm";
};

type FormCustomProps = {
    openConfirmModal: boolean;
    setOpenConfirmModal: (s: boolean) => void;
    title?: string;
    descriptionList?: string[];
    buttonList: ButtonType[];
    icon: React.ReactNode;
};

function ModalCustom({
    openConfirmModal,
    setOpenConfirmModal,
    title,
    descriptionList,
    buttonList,
    icon,
}: FormCustomProps) {
    return (
        <Modal
            footer={null}
            centered
            closable={false}
            visible={openConfirmModal}
            className={styles.customModal}
        >
            <Col span={24}>
                <Row>
                    <Col span={2}>{icon}</Col>
                    <Col span={22}>
                        <Row align="middle" justify="space-between">
                            <h3 className={styles.lockModalTitle}>{title}</h3>
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
                            {descriptionList?.map((item, index) => {
                                const key = index;
                                return (
                                    <span
                                        key={key}
                                        className={styles.lockModalDesc}
                                    >
                                        {item}
                                    </span>
                                );
                            })}
                        </Row>
                    </Col>
                </Row>
                <Row
                    align="middle"
                    justify="end"
                    style={{ gap: "8px", marginTop: "24px" }}
                >
                    {buttonList.map((item, index) => {
                        const key = index;
                        return (
                            <Button
                                key={key}
                                className={styles[`${item.type}`]}
                                size="large"
                                onClick={() => item.action()}
                            >
                                {item.title}
                            </Button>
                        );
                    })}
                </Row>
            </Col>
        </Modal>
    );
}

export default ModalCustom;
