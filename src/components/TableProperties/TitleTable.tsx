import style from "./style.less";
import { Input } from "antd";
import searchIcon from "@/assets/images/svg/icon/search-icon.svg";

type TitleTableProps = {
    children: string;
};

function TitleTable({ children }: TitleTableProps) {
    return (
        <div className={style["title-table"]}>
            <h1 className={style.title}>{children}</h1>
            {/* <div className={style["input-box"]}></div> */}
            <Input
                className={style["input-box"]}
                placeholder="Tìm kiếm"
                prefix={<img className={style.icon} src={searchIcon} alt="" />}
            />
        </div>
    );
}

export default TitleTable;
