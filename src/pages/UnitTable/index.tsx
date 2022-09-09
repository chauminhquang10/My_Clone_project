import { addRule, unit } from "@/services/ant-design-pro/api";
import type {
    ActionType,
    ProColumns,
    ProDescriptionsItemProps,
} from "@ant-design/pro-components";
import {
    ModalForm,
    PageContainer,
    ProDescriptions,
    ProFormText,
    ProFormTextArea,
    ProTable,
} from "@ant-design/pro-components";
import { Drawer, message } from "antd";
import { useRef, useState } from "react";
import { FormattedMessage, useIntl } from "umi";
import AddNew from "./components/AddNew";
import Column from "./components/Column";
// import SelectPage from "./components/SelectPage";
import style from "./components/style.less";
import TitleTable from "./components/TitleTable";

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
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
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
    const intl = useIntl();

    // const [page, setPage] = useState<number>();
    // const [pageSize, setPageSize] = useState<number>();
    // const pageSizeRef = useRef<number>(20);
    const columns: ProColumns<API.ManagementUnitResponse>[] = Column({
        setCurrentRow,
        setShowDetail,
    });

    const [currentPage, setCurrentPage] = useState<number>(0);
    const pageSize = useRef<number>(30);
    // const [totalPage, setTotalPage] = useState<number>(1);

    return (
        <PageContainer
            className={style["table-container"]}
            header={{
                title: "",
            }}
            footer={undefined}
        >
            <ProTable<API.ManagementUnitResponse, APIS.PageParams>
                headerTitle={<TitleTable />}
                actionRef={actionRef}
                rowKey="key"
                search={false}
                toolBarRender={() => [
                    <AddNew
                        key="primary"
                        onClick={() => {
                            handleModalVisible(true);
                        }}
                    />,
                ]}
                request={unit}
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
                    locale: { items_per_page: "" },
                    showSizeChanger: false,
                    pageSize: pageSize.current,
                    showTotal: (total, range) => (
                        <div
                            className={style["total-box"]}
                        >{`${range[0]}-${range[1]} trong số ${total}`}</div>
                    ),
                    hideOnSinglePage: true,
                }}
            />

            <ModalForm
                title={intl.formatMessage({
                    id: "pages.searchTable.createForm.newRule",
                    defaultMessage: "New rule",
                })}
                width="400px"
                visible={createModalVisible}
                onVisibleChange={handleModalVisible}
                onFinish={async (value) => {
                    const success = await handleAdd(
                        value as API.ManagementUnitResponse
                    );
                    if (success) {
                        handleModalVisible(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
            >
                <ProFormText
                    rules={[
                        {
                            required: true,
                            message: (
                                <FormattedMessage
                                    id="pages.searchTable.ruleName"
                                    defaultMessage="Rule name is required"
                                />
                            ),
                        },
                    ]}
                    width="md"
                    name="name"
                />
                <ProFormTextArea width="md" name="desc" />
            </ModalForm>

            <Drawer
                width={600}
                visible={showDetail}
                onClose={() => {
                    setCurrentRow(undefined);
                    setShowDetail(false);
                }}
                closable={false}
            >
                {currentRow?.name && (
                    <ProDescriptions<API.ManagementUnitResponse>
                        column={2}
                        title={currentRow?.name}
                        request={async () => ({
                            data: currentRow || {},
                        })}
                        params={{
                            id: currentRow?.name,
                        }}
                        columns={
                            columns as ProDescriptionsItemProps<API.ManagementUnitResponse>[]
                        }
                    />
                )}
            </Drawer>
        </PageContainer>
    );
};

export default TableCustom;
