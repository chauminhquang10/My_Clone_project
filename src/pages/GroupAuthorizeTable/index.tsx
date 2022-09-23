import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';
import { useModel, useRequest } from 'umi';
import NewRoleListForm from './components/forms/NewRoleListForm';
import AddNew from '@/components/TableProperties/AddNew';
import Column from './components/tables/Column';
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import RoleListDetailDrawer from './components/forms/RoleListDetailDrawer';
import { createRoleGroup, getAllRoleGroup } from '@/services/STM-APIs/RoleController';

const TableCustom = () => {
  // get current user info
  const { initialState } = useModel('@@initialState');

  // xử lí cho phép tạo mới
  const [enableCreateNew, setEnableCreateNew] = useState<boolean>(true);

  // xử lí dữ liệu check all để send api
  const [checkAllKeys, setCheckAllKeys] = useState<(number | string)[]>([]);

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RoleGroupResponse>();

  // const [page, setPage] = useState<number>();
  // const [pageSize, setPageSize] = useState<number>();
  // const pageSizeRef = useRef<number>(20);
  const columns: ProColumns<API.RoleGroupResponse>[] = Column({
    setCurrentRow,
    setShowDetail,
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = useRef<number>(20);
  // const [totalPage, setTotalPage] = useState<number>(1);

  //-------------- Pagination props --------------------------------
  const paginationLocale = {
    items_per_page: '',
    jump_to: 'Trang',
    page: '',
  };

  const { run: runGetAllRolesGroup } = useRequest<API.ResponseBaseListRoleGroupResponse>(
    () => getAllRoleGroup(),
    {
      onSuccess() {
        if (!initialState?.currentUser?.admin) {
          setEnableCreateNew(false);
        }
      },

      onError(error) {
        console.log('error', error);
        // notification.error({
        //   message: messageErrorData,
        //   description: e?.data?.code,
        // });
      },
    },
  );

  const handleAddNewRoleGroup = async (value: { roleGroupName: string }) => {
    const hide = message.loading('Loading...');

    // lọc bỏ toàn bộ các key có kiểu string, vì nó là key của  thằng item cha
    const finalAllKeysData = checkAllKeys.filter((dataKey) => typeof dataKey !== 'string');

    try {
      await createRoleGroup({ name: value.roleGroupName, actionIds: finalAllKeysData as number[] });
      hide();
      message.success('Thêm nhóm quyền mới thành công');
      handleModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
    }
  };

  return (
    <PageContainer
      className={style['table-container']}
      header={{
        title: '',
      }}
      footer={undefined}
    >
      <ProTable
        headerTitle={<TitleTable>Danh sách nhóm quyền</TitleTable>}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <AddNew
            key="primary"
            enableCreateNew={enableCreateNew}
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
          title="Tạo nhóm quyền"
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
          detailActionRef={actionRef}
        />
      )}
    </PageContainer>
  );
};

export default TableCustom;
