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
            title: <HeadCell>Tên phiên bản</HeadCell>,
            dataIndex: "id",
            render: (dom) => {
                const stt = dom as number;
                return <TextCell>{stt}</TextCell>;
            },
            sorter: (a, b) => {
                if (a.name && b.name) return a.name.localeCompare(b.name);
                else return 1;
            },
        },
        {
            title: <HeadCell>Loại máy</HeadCell>,
            dataIndex: "name",
            render: (dom) => {
                return <TextCell>{dom}</TextCell>;
            },
            filters: [
                { text: "6", value: "6" },
                { text: "5", value: "5" },
            ],
            onFilter: (value, record) => {
                return record.name?.includes(value as string) as boolean;
            },
        },
        {
            title: <HeadCell>Dòng máy</HeadCell>,
            dataIndex: "location",
            render: (dom) => {
                return <TextCell>{dom}</TextCell>;
            },
            filters: [
                { text: "6", value: "6" },
                { text: "5", value: "5" },
            ],
            onFilter: (value, record) => {
                return record.name?.includes(value as string) as boolean;
            },
        },
        {
            title: <HeadCell>Nội dung</HeadCell>,
            dataIndex: "province",
            render: (_, entity) => {
                return <TextCell>{entity.province?.name}</TextCell>;
            },
        },
        {
            title: <HeadCell>Điều kiện nâng cấp</HeadCell>,
            dataIndex: "machineType",
            render: (dom) => {
                return <TextCell>{dom}</TextCell>;
            },
        },
        {
            title: <HeadCell>Thời gian tải lên</HeadCell>,
            dataIndex: "status",
            render: (dom) => {
                return <TextCell>{dom}</TextCell>;
            },
            filters: [
                { text: "6", value: "6" },
                { text: "5", value: "5" },
            ],
            onFilter: (value, record) => {
                return record.name?.includes(value as string) as boolean;
            },
        },
    ];
    return columns;
}

export default Column;
