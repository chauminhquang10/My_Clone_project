import type { ProColumns } from "@ant-design/pro-components";
import HeadCell from "@/components/TableProperties/HeadCell";
import { TextCell } from "@/components/TableProperties//TableCell";

type ColumnProps = {
    setCurrentRow: (s: API.StmInfoResponse) => void;
    setShowDetail: (s: boolean) => void;
};

function Column({}: ColumnProps) {
    const columns: ProColumns<API.StmInfoResponse>[] = [
        {
            title: <HeadCell>Loại thiết bị</HeadCell>,
            dataIndex: "id",
            render: (dom) => {
                const stt = dom as number;
                return <TextCell>{stt}</TextCell>;
            },
        },
        {
            title: <HeadCell>Đơn vị tính</HeadCell>,
            dataIndex: "name",
            render: (dom) => {
                return <TextCell>{dom}</TextCell>;
            },
            sorter: (a, b) => {
                if (a.name && b.name) return a.name.localeCompare(b.name);
                else return 1;
            },
        },
        {
            title: <HeadCell>Sức chứa tối thiểu</HeadCell>,
            dataIndex: "location",
            render: (dom) => {
                return <TextCell>{dom}</TextCell>;
            },
            filters: [
                { text: "6", value: "6" },
                { text: "777", value: "777" },
            ],
            onFilter: (value, record) => {
                return record.location?.includes(value as string) as boolean;
            },
        },
    ];
    return columns;
}

export default Column;
