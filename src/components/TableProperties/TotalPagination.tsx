import style from "./style.less";

type TotalPaginationProps = {
    total: number;
    range: [number, number];
};

const TotalPagination = ({ total, range }: TotalPaginationProps) => (
    <div
        className={style["total-box"]}
    >{`${range[0]}-${range[1]} trong số ${total}`}</div>
);

export default TotalPagination;
