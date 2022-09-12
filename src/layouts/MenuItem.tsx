import type { MenuDataItem } from "@ant-design/pro-components";
import { memo, ReactNode } from "react";
import { FormattedMessage, Link } from "umi";
import { icons } from "./data";

interface MenuItemProps {
    menuItemProps: MenuDataItem & {
        isUrl: boolean;
        onClick: () => void;
    };
    defaultDom: ReactNode;
}

function MenuItem({ defaultDom, menuItemProps }: MenuItemProps) {
    if (
        menuItemProps.isUrl ||
        !menuItemProps.path ||
        location.pathname === menuItemProps.path
    ) {
        return defaultDom;
    }
    const Icon: string = icons[menuItemProps.icon as keyof typeof icons];

    return (
        <>
            <img src={Icon} />
            <Link to={menuItemProps.path} style={{ marginLeft: 16 }}>
                <FormattedMessage id={menuItemProps.locale as string} />
            </Link>
        </>
    );
}

export default memo(MenuItem);
