import React, { useEffect, useRef, useState } from "react";
import activeIcon from "../images/svg/active-icon.svg";
import lockIcon from "../images/svg/lock-icon.svg";
import connectBoardIcon from "../images/svg/connect-boards.svg";
import style from "./style.less";

//--------------- TextCell of Table ----------------

type TextCellProps = {
    children: React.ReactNode | string;
    onClick?: () => void;
    blue?: boolean;
    position?: "left" | "right" | "center";
};

export function TextCell({ children, onClick, blue, position }: TextCellProps) {
    return onClick ? (
        <div
            className={`${style["text-cell-click"]} ${blue && style.blue}`}
            onClick={onClick}
            style={{
                textAlign: position ? position : "center",
            }}
        >
            {children}
        </div>
    ) : (
        <div
            className={`${style["text-cell"]} ${blue && style.blue}`}
            style={{
                textAlign: position ? position : "center",
            }}
        >
            {children}
        </div>
    );
}

//--------------- UserStatusCell of table ----------------

type UserStatusCellProps = {
    children: string;
};

export function UserStatusCell({ children }: UserStatusCellProps) {
    switch (children) {
        case "ĐANG HOẠT ĐỘNG":
            return (
                <div className={style["user-active-cell"]}>
                    <p className={style.text}>{children}</p>
                    <img src={activeIcon} alt="" className={style.icon} />
                </div>
            );
        case "TẠM KHOÁ":
            return (
                <div className={style["user-lock-cell"]}>
                    <p className={style.text}>{children}</p>
                    <img src={lockIcon} alt="" className={style.icon} />
                </div>
            );
        default:
            return <div className={style["user-cell"]}>{children}</div>;
    }
}

//--------------- MachineItem of ManageCell ----------------

type MachineItemProps = {
    machine: MachineType;
};

function MachineItem({ machine }: MachineItemProps) {
    return <span className={style["machine-item"]}>{`(${machine.text})`}</span>;
}

//--------------- RestItem of ManageCell ----------------

type RestItemProps = {
    children: string;
    onClick: () => void;
};

function RestItem({ children, onClick }: RestItemProps) {
    return (
        <span className={style["rest-item"]} onClick={onClick}>
            {children}
        </span>
    );
}

//--------------- DropdownItem of ManageCell ----------------

type DropdownItemProps = {
    machine: MachineType;
    onClick: () => void;
};

function DropdownItem({ machine, onClick }: DropdownItemProps) {
    return (
        <div className={style["dropdown-item"]} onClick={onClick}>
            <span className={style.text}>{machine.text}</span>
            <button className={style["detail-btn"]}>
                <img className="detail-icon" src={connectBoardIcon} alt="" />
                <span className={style["detail-text"]}>Chi tiết</span>
            </button>
        </div>
    );
}

//--------------- ManageCell of Table ----------------

type MachineType = {
    text: string;
    id: string;
};

type ManageCellProps = {
    listMachine: MachineType[];
};

export function ManageCell({ listMachine }: ManageCellProps) {
    const amountMachine: number = listMachine.length;
    const [active, setActive] = useState(false);
    const boxHoverRef = useRef<HTMLDivElement | null>(null);
    //------------ function see detail machine --------------------
    const openDetailMachine = () => {
        console.log("open");
    };
    //------------ function open dropdown --------------------
    const openDropdown = () => {
        console.log(boxHoverRef.current);
        setActive(true);
    };
    //------------ handle close dropdown ----------------
    useEffect(() => {
        const closeDropdown = (e: any) => {
            if (e.target !== boxHoverRef.current && active) {
                setActive(false);
            }
        };
        addEventListener("click", closeDropdown);
        return () => {
            removeEventListener("click", closeDropdown);
        };
    }, [active]);
    return (
        <div className={style["manage-cell"]}>
            {amountMachine <= 2 ? (
                listMachine.map((item) => {
                    return <MachineItem machine={item} key={item.id} />;
                })
            ) : (
                <>
                    <MachineItem machine={listMachine[0]} />
                    <MachineItem machine={listMachine[1]} />
                    <RestItem onClick={openDropdown}>{`+${
                        amountMachine - 2
                    }`}</RestItem>
                </>
            )}
            <div
                className={`${style["box-hover"]} ${
                    active ? style.active : ""
                } ${amountMachine > 5 ? style.scroll : ""}`}
                ref={boxHoverRef}
            >
                {listMachine.map((item) => {
                    return (
                        <DropdownItem
                            machine={item}
                            key={item.id}
                            onClick={openDetailMachine}
                        />
                    );
                })}
            </div>
        </div>
    );
}
