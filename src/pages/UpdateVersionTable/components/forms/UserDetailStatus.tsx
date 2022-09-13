import { Tag } from "antd";
import React from "react";

import styles from "./UserDetailStatus.less";

type UserDetailStatusProps = {
    status: string;
};

const TAG_COLORS = { active: "#D9F7BE", inActive: "#FFCCC7" };

const TAG_TITLES = { active: "ĐANG HOẠT ĐỘNG", inActive: "TẠM KHÓA" };

const TAG_TITLE_COLORS = { active: "#237804", inActive: "#a8071a" };

const UserDetailStatus: React.FC<UserDetailStatusProps> = ({ status }) => {
    return (
        <Tag className={styles.avatarStatus} color={TAG_COLORS[status]}>
            <span
                className={styles.avatarTitle}
                style={{ color: TAG_TITLE_COLORS[status] }}
            >
                {TAG_TITLES[status]}
            </span>
        </Tag>
    );
};

export default UserDetailStatus;
