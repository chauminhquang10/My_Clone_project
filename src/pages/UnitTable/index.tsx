import { addRule, unit } from "@/services/ant-design-pro/api";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import UnitDetailDrawer from "./components/forms/UnitDetailDrawer";
import { message } from "antd";
import { useRef, useState } from "react";
import AddNew from "@/components/TableProperties/AddNew";
import Column from "./components/tables/Column";
// import SelectPage from "./components/tables/SelectPage";
import style from "@/components/TableProperties/style.less";
import TitleTable from "@/components/TableProperties/TitleTable";
import TotalPagination from "@/components/TableProperties/TotalPagination";
import NewUnitForm from "./components/forms/NewUnitForm";

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.ManagementUnitResponse) => {
    const hide = message.loading("正在添加");
    try {
        await addRule({ ...fields });
        hide();
        message.success("Added successfully");
        return true;
    } catch (error) {
        hide();
        message.error("Adding failed, please try again!");
        return false;
    }
};

const TableCustom = () => {
    /**
     * @en-US Pop-up window of new window
     * @zh-CN 新建窗口的弹窗
     *  */
    const [createModalVisible, handleCreateModalVisible] =
        useState<boolean>(false);
    /**
     * @en-US The pop-up window of the distribution update window
     * @zh-CN 分布更新窗口的弹窗
     * */
    // const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

    const [showDetail, setShowDetail] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.ManagementUnitResponse>();

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */

    // const [page, setPage] = useState<number>();
    // const [pageSize, setPageSize] = useState<number>();
    // const pageSizeRef = useRef<number>(20);
    const columns: ProColumns<API.ManagementUnitResponse>[] = Column({
        setCurrentRow,
        setShowDetail,
    });

    const [currentPage, setCurrentPage] = useState<number>(0);
    const pageSize = useRef<number>(20);
    // const [totalPage, setTotalPage] = useState<number>(1);

    //-------------- Pagination props --------------------------------
    const paginationLocale = {
        items_per_page: "",
        jump_to: "Trang",
        page: "",
    };
    return (
        <PageContainer
            className={style["table-container"]}
            header={{
                title: "",
            }}
            footer={undefined}
        >
            <ProTable
                headerTitle={<TitleTable>Đơn vị quản lý</TitleTable>}
                actionRef={actionRef}
                rowKey="key"
                search={false}
                toolBarRender={() => [
                    <AddNew
                        key="primary"
                        onClick={() => {
                            handleCreateModalVisible(true);
                        }}
                    />,
                ]}
                request={unit}
                // request={async (params = {}) => {
                //     const filterParams: API.UserFilter = {
                //         managementUnit: "",
                //         staffId: "",
                //     };

                //     const pageRequestParams: API.PageReq = {
                //         pageNumber: params.current,
                //         pageSize: params.pageSize,
                //         sortDirection: "",
                //         sortBy: "",
                //     };
                //     await runGetAllUser({
                //         filter: filterParams,
                //         pageRequest: pageRequestParams,
                //     });
                //     return {
                //         data: listUser,
                //     };
                // }}
                columns={columns}
                options={false}
                // rowSelection={{
                //     onChange: (_, selectedRows) => {
                //         setSelectedRows(selectedRows);
                //     },
                // }}
                pagination={{
                    onChange(current) {
                        setCurrentPage(current);
                    },
                    current: currentPage,
                    className: style["pagination-custom"],
                    locale: { ...paginationLocale },
                    showSizeChanger: false,
                    pageSize: pageSize.current,
                    showTotal: (total, range) => (
                        <TotalPagination total={total} range={range} />
                    ),
                    hideOnSinglePage: true,
                    showQuickJumper: true,
                }}
            />

            <NewUnitForm
                title="Tạo đơn vị quản lý mới"
                width="934px"
                visible={createModalVisible}
                onVisibleChange={handleCreateModalVisible}
                onFinish={async (value) => {
                    const success = await handleAdd(
                        value as API.ManagementUnitResponse
                    );
                    if (success) {
                        handleCreateModalVisible(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                        return true;
                    }
                    return false;
                }}
            />

            <UnitDetailDrawer
                currentRow={currentRow}
                setCurrentRow={setCurrentRow}
                showDetail={showDetail}
                setShowDetail={setShowDetail}
            />
        </PageContainer>
    );
};

export default TableCustom;
