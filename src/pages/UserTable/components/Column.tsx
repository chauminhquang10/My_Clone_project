import type { ProColumns } from "@ant-design/pro-components";
import HeadCell from "./HeadCell";
import { ManageCell, TextCell, UserStatusCell } from "./TableCell";

type ColumnProps = {
    setCurrentRow: (s: API.RuleListItem) => void;
    setShowDetail: (s: boolean) => void;
};

function Column({ setCurrentRow, setShowDetail }: ColumnProps) {
    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: <HeadCell>STT</HeadCell>,
            sorter: (a, b) => {
                return (a.key as number) - (b.key as number);
            },
            dataIndex: "id",
            render: (dom) => {
                const stt = dom as number;
                return <TextCell>{stt}</TextCell>;
            },
        },
        {
            title: <HeadCell>Mã nhân viên</HeadCell>,
            dataIndex: "employeeNo",
            valueType: "textarea",
            render: (dom, entity) => {
                return (
                    <TextCell
                        onClick={() => {
                            setCurrentRow(entity);
                            setShowDetail(true);
                        }}
                    >
                        {dom}
                    </TextCell>
                );
            },
        },
        {
            title: <HeadCell>Tên nhân viên</HeadCell>,
            dataIndex: "employeeName",
            sorter: true,
            hideInForm: true,
            render: (dom, entity) => {
                return (
                    <TextCell
                        onClick={() => {
                            setCurrentRow(entity);
                            setShowDetail(true);
                        }}
                        position="left"
                    >
                        {dom}
                    </TextCell>
                );
            },
        },
        {
            title: <HeadCell>Mã - Tên đơn vị</HeadCell>,
            dataIndex: "unit",
            sorter: (a, b) => {
                return (a.status as number) - (b.status as number);
            },
            filters: true,

            onFilter: true,
            valueEnum: {
                0: {
                    text: "unit 0",
                },
                1: {
                    text: "unit 1",
                },
            },
            render: (dom) => {
                return <TextCell position="left">{dom}</TextCell>;
            },
        },
        {
            title: <HeadCell>Email</HeadCell>,
            dataIndex: "email",
            valueType: "textarea",
            render: (dom) => {
                return (
                    <TextCell position="left" blue={true}>
                        {dom}
                    </TextCell>
                );
            },
        },
        {
            title: <HeadCell>Số điện thoại</HeadCell>,
            dataIndex: "phoneNumber",
            valueType: "textarea",
            render: (dom) => {
                return <TextCell>{dom}</TextCell>;
            },
        },
        {
            title: <HeadCell>Quản lý máy</HeadCell>,
            dataIndex: "listMachine",
            valueType: "textarea",
            render: (dom) => {
                // console.log(typeof dom);
                return <ManageCell listMachine={dom} />;
            },
        },
        {
            title: <HeadCell>Trạng thái hoạt động</HeadCell>,
            dataIndex: "status",
            hideInForm: true,
            filters: true,
            onFilter: true,
            valueEnum: {
                0: {
                    text: <UserStatusCell>ĐANG HOẠT ĐỘNG</UserStatusCell>,
                },
                1: {
                    text: <UserStatusCell>TẠM KHOÁ</UserStatusCell>,
                },
            },
        },
    ];
    return columns;
}

export default Column;
