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
            title: <HeadCell>Tên máy</HeadCell>,
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
            title: <HeadCell>Terminal ID</HeadCell>,
            dataIndex: "location",
            render: (dom) => {
                return <TextCell>{dom}</TextCell>;
            },
        },
        {
            title: <HeadCell>IP Address</HeadCell>,
            dataIndex: "province",
            render: (_, entity) => {
                return <TextCell>{entity.province?.name}</TextCell>;
            },
        },
        {
            title: <HeadCell>Tổng giao dịch</HeadCell>,
            dataIndex: "machineType",
            render: (dom) => {
                return <TextCell>{dom}</TextCell>;
            },
            sorter: (a, b) => {
                if (a.name && b.name) return a.name.localeCompare(b.name);
                else return 1;
            },
        },
        {
            title: <HeadCell>Thành công</HeadCell>,
            dataIndex: "status",
            render: (dom) => {
                return <TextCell>{dom}</TextCell>;
            },
            sorter: (a, b) => {
                if (a.name && b.name) return a.name.localeCompare(b.name);
                else return 1;
            },
        },
        {
            title: <HeadCell>Thất bại</HeadCell>,
            dataIndex: "terminalId",
            render: (dom) => {
                return <TextCell>{dom}</TextCell>;
            },
            sorter: (a, b) => {
                if (a.name && b.name) return a.name.localeCompare(b.name);
                else return 1;
            },
        },
    ];
    return columns;
}

export default Column;
