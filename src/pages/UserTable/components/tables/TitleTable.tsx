import style from "./style.less";
import { Input } from "antd";
import searchIcon from "@/assets/images/svg/icon/search-icon.svg";
function TitleTable() {
    return (
        <div className={style["title-table"]}>
            <h1 className={style.title}>Danh sách người dùng</h1>
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
