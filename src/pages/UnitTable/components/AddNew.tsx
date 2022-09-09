import { PlusOutlined } from "@ant-design/icons";
import style from "./style.less";

type AddNewProps = {
    onClick: () => void;
};

function AddNew({ onClick }: AddNewProps) {
    return (
        <button className={style["btn-add"]} onClick={onClick}>
            <span className={style["text-add"]}>Tạo mới</span>
            <PlusOutlined className={style.icon} />
        </button>
    );
}

export default AddNew;
