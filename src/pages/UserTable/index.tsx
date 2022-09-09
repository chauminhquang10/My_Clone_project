import { addRule, removeRule, rule } from "@/services/ant-design-pro/api";
import type {
    ActionType,
    ProColumns,
    ProDescriptionsItemProps,
} from "@ant-design/pro-components";
import {
    FooterToolbar,
    ModalForm,
    PageContainer,
    ProDescriptions,
    ProFormText,
    ProFormTextArea,
    ProTable,
} from "@ant-design/pro-components";
import { Button, Drawer, message } from "antd";
import React, { useRef, useState } from "react";
import { FormattedMessage, useIntl } from "umi";
import AddNew from "./components/AddNew";
import Column from "./components/Column";
import style from "./components/style.less";
import TitleTable from "./components/TitleTable";

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
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

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
    const hide = message.loading("正在删除");
    if (!selectedRows) return true;
    try {
        await removeRule({
            key: selectedRows.map((row) => row.key),
        });
        hide();
        message.success("Deleted successfully and will refresh soon");
        return true;
    } catch (error) {
        hide();
        message.error("Delete failed, please try again");
        return false;
    }
};

const TableList: React.FC = () => {
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
    const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
    const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>(
        []
    );

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */
    const intl = useIntl();

    // const [page, setPage] = useState<number>();
    // const [pageSize, setPageSize] = useState<number>();
    // const pageSizeRef = useRef<number>(20);
    const columns: ProColumns<API.RuleListItem>[] = Column({
        setCurrentRow,
        setShowDetail,
    });

    return (
        <PageContainer
            className={style["table-container"]}
            header={{
                title: "",
            }}
            footer={undefined}
        >
            <ProTable<API.RuleListItem, API.PageParams>
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
                request={rule}
                columns={columns}
                options={false}
                // rowSelection={{
                //     onChange: (_, selectedRows) => {
                //         setSelectedRows(selectedRows);
                //     },
                // }}
                // pagination={{
                //     onChange(current, pageSizeOnchange) {
                //         setPage(current);
                //         setPageSize(pageSizeOnchange);
                //     },
                //     className: 'pagination-custom',
                //     locale: { items_per_page: '' },
                //     total: length,
                //     pageSize: pageSizeRef.current,
                //     showSizeChanger: true,
                //     showTotal: (total, range) =>
                //         `Từ ${range[0]} đến ${range[1]} trên tổng số ${total} kết quả`,
                // }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            <FormattedMessage
                                id="pages.searchTable.chosen"
                                defaultMessage="Chosen"
                            />{" "}
                            <a style={{ fontWeight: 600 }}>
                                {selectedRowsState.length}
                            </a>{" "}
                            <FormattedMessage
                                id="pages.searchTable.item"
                                defaultMessage="项"
                            />
                            &nbsp;&nbsp;
                            <span>
                                <FormattedMessage
                                    id="pages.searchTable.totalServiceCalls"
                                    defaultMessage="Total number of service calls"
                                />{" "}
                                {selectedRowsState.reduce(
                                    (pre, item) => pre + item.callNo!,
                                    0
                                )}{" "}
                                <FormattedMessage
                                    id="pages.searchTable.tenThousand"
                                    defaultMessage="万"
                                />
                            </span>
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        <FormattedMessage
                            id="pages.searchTable.batchDeletion"
                            defaultMessage="Batch deletion"
                        />
                    </Button>
                    <Button type="primary">
                        <FormattedMessage
                            id="pages.searchTable.batchApproval"
                            defaultMessage="Batch approval"
                        />
                    </Button>
                </FooterToolbar>
            )}
            <ModalForm
                title={intl.formatMessage({
                    id: "pages.searchTable.createForm.newRule",
                    defaultMessage: "New rule",
                })}
                width="400px"
                visible={createModalVisible}
                onVisibleChange={handleModalVisible}
                onFinish={async (value) => {
                    const success = await handleAdd(value as API.RuleListItem);
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
                    <ProDescriptions<API.RuleListItem>
                        column={2}
                        title={currentRow?.name}
                        request={async () => ({
                            data: currentRow || {},
                        })}
                        params={{
                            id: currentRow?.name,
                        }}
                        columns={
                            columns as ProDescriptionsItemProps<API.RuleListItem>[]
                        }
                    />
                )}
            </Drawer>
        </PageContainer>
    );
};

export default TableList;
