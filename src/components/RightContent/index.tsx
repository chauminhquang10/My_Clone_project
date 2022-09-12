import { BellOutlined } from "@ant-design/icons";
import { Badge, Space } from "antd";
import React from "react";
import { useModel } from "umi";
import AvatarDropdown from "./AvatarDropdown";
import styles from "./index.less";

export type SiderTheme = "light" | "dark";

const GlobalHeaderRight: React.FC = () => {
    const { initialState } = useModel("@@initialState");

    if (!initialState || !initialState.settings) {
        return null;
    }

    const { navTheme, layout } = initialState.settings;
    let className = styles.right;

    if ((navTheme === "dark" && layout === "top") || layout === "mix") {
        className = `${styles.right}  ${styles.dark}`;
    }
    return (
        <Space align="start" className={className}>
            <Badge
                count={5}
                style={{ borderColor: "transparent" }}
                offset={[-3, 5]}
            >
                <BellOutlined style={{ fontSize: 32, color: "#eee" }} />
            </Badge>
            <AvatarDropdown />
        </Space>
    );
};
export default GlobalHeaderRight;
