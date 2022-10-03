import AddNew from '@/components/TableProperties/AddNew';
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import { createRoleGroup, getAllRoleGroup } from '@/services/STM-APIs/RoleController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';
import { Access, useModel, useRequest } from 'umi';
import NewRoleListForm from './components/forms/NewRoleListForm';
import RoleListDetailDrawer from './components/forms/RoleListDetailDrawer';
import Column from './components/tables/Column';

import { useIntl } from 'umi';
import Admin from '../Admin';

const TableCustom = () => {
  const intl = useIntl();
  // xử lí dữ liệu check all để send api
  const [checkAllKeys, setCheckAllKeys] = useState<(number | string)[]>([]);

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [currentRow, setCurrentRow] = useState<API.RoleGroupResponse>();

  // const [page, setPage] = useState<number>();
  // const [pageSize, setPageSize] = useState<number>();
  // const pageSizeRef = useRef<number>(20);
  const columns: ProColumns<API.RoleGroupResponse>[] = Column({
    setCurrentRow,
    setShowDetail,
  });

  const actionRef = useRef<ActionType>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = useRef<number>(20);
  // const [totalPage, setTotalPage] = useState<number>(1);

  //-------------- Pagination props --------------------------------
  const paginationLocale = {
    items_per_page: '',
    jump_to: intl.formatMessage({ id: 'page' }),
    page: '',
  };

  const { run: runGetAllRolesGroup } = useRequest<API.ResponseBaseListRoleGroupResponse>(
    () => getAllRoleGroup(),
    {
      onSuccess() {},

      onError(error) {
        console.log('error', error);
        // notification.error({
        //   message: messageErrorData,
        //   description: e?.data?.code,
        // });
      },
      manual: true,
    },
  );

  const handleAddNewRoleGroup = async (value: { roleGroupName: string }) => {
    const hide = message.loading('Loading...');

    // lọc bỏ toàn bộ các key có kiểu string, vì nó là key của  thằng item cha
    const finalAllKeysData = checkAllKeys.filter((dataKey) => typeof dataKey !== 'string');

    try {
      await createRoleGroup({ name: value.roleGroupName, actionIds: finalAllKeysData as number[] });
      hide();
      message.success(
        intl.formatMessage({
          id: 'createRoleGroup_successStatus_message',
        }),
      );
      handleModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
    }
  };
  const { initialState } = useModel('@@initialState');

  return (
    <Access accessible={initialState?.currentUser?.admin || false} fallback={<Admin />}>
      <PageContainer
        className={style['table-container']}
        header={{
          title: '',
        }}
        footer={undefined}
      >
        <ProTable
          headerTitle={
            <TitleTable>
              {intl.formatMessage({
                id: 'roleGroup_tableTitle',
              })}
            </TitleTable>
          }
          actionRef={actionRef}
          rowKey="key"
          search={false}
          toolBarRender={() => [
            <AddNew
              key="primary"
              enableCreateNew={true}
              onClick={() => {
                handleModalVisible(true);
              }}
            />,
          ]}
          request={async () => {
            const res = await runGetAllRolesGroup();
            return {
              data: res?.roleGroups,
              total: res?.roleGroups ? res.roleGroups.length : 0,
              success: true,
            };
          }}
          columns={columns}
          options={false}
          pagination={{
            onChange(current) {
              setCurrentPage(current);
            },
            current: currentPage,
            className: style['pagination-custom'],
            locale: { ...paginationLocale },
            showSizeChanger: false,
            pageSize: pageSize.current,
            showTotal: (total, range) => <TotalPagination total={total} range={range} />,
            hideOnSinglePage: true,
            showQuickJumper: true,
          }}
          onRow={(rowData) => ({
            onClick: () => {
              setCurrentRow(rowData);
            },
          })}
        />
        {createModalVisible && (
          <NewRoleListForm
            title={intl.formatMessage({
              id: 'roleGroup_createForm_title',
            })}
            width="934px"
            checkAllKeys={checkAllKeys}
            setCheckAllKeys={setCheckAllKeys}
            visible={createModalVisible}
            onVisibleChange={handleModalVisible}
            onFinish={async (value: { roleGroupName: string }) => {
              await handleAddNewRoleGroup(value);
            }}
          />
        )}

        {showDetail && (
          <RoleListDetailDrawer
            currentRoleGroup={currentRow}
            setCurrentRoleGroup={setCurrentRow}
            showDetail={showDetail}
            setShowDetail={setShowDetail}
            runGetAllRolesGroup={() => {
              actionRef.current?.reloadAndRest?.();
            }}
          />
        )}
      </PageContainer>
    </Access>
  );
};

export default TableCustom;
