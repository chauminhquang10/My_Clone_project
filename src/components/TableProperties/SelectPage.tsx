import { Select } from "antd";
const { Option } = Select;
type SelectPageProps = {
    totalPage: number;
    currentPage: number;
    onChange: (index: number) => void;
};

function SelectPage({ totalPage, onChange, currentPage }: SelectPageProps) {
    const options = new Array(totalPage);
    return (
        <Select
            defaultValue={1}
            style={{ width: 120 }}
            onChange={(e) => {
                onChange(e.valueOf());
            }}
            dropdownStyle={{
                bottom: 0,
            }}
            value={currentPage}
        >
            {Array(...options).map((item, index) => {
                const id = index + 1;
                return (
                    <Option key={id} value={item}>
                        {id}
                    </Option>
                );
            })}
        </Select>
    );
}

export default SelectPage;
