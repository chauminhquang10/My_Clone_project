import { addRule } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
// import { getAllUsers } from "@/services/STM-APIs/UserController";
import Api from '@/services/STM-APIs';
import { PageContainer, ProFormText, ProFormTextArea, ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';
import { FormattedMessage, useRequest } from 'umi';
// import {useRequest} from "umi";
import AddNew from '@/components/TableProperties/AddNew';
import NewUserForm from './components/forms/NewUserForm';
import UserDetailDrawer from './components/forms/UserDetailDrawer';
import Column from './components/tables/Column';
// import SelectPage from "./components/tables/SelectPage";
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import { openNotification } from '@/utils';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.UserResponse) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

const UserManagementTable: React.FC = () => {
  const { run: runGetAllUser } = useRequest(
    (params: API.getAllUsersParams) => Api.UserController.getAllUsers(params),
    {
      manual: true,
      onSuccess: (res) => {
        if (!res) {
          openNotification('error', 'Đã xảy ra lỗi', 'Vui lòng thử lại sau');
          return;
        }
        console.log('user list data: ', res);
        return res;
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
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
  const [currentRow, setCurrentRow] = useState<API.UserResponse>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  // const [page, setPage] = useState<number>();
  // const [pageSize, setPageSize] = useState<number>();
  // const pageSizeRef = useRef<number>(20);
  const columns: ProColumns<API.UserResponse>[] = Column({
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

  return (
    <PageContainer
      className={style['table-container']}
      header={{
        title: '',
      }}
      footer={undefined}
    >
      <ProTable
        headerTitle={<TitleTable>Danh sách người dùng</TitleTable>}
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
        // request={rule}
        request={async (params = {}) => {
          console.log('params request user list: ', params);
          const filterParams = {
            managementUnit: '',
            staffId: '',
          };

          const pageRequestParams = {
            // pageNumber: params.current,
            // pageSize: params.pageSize,
            // sortDirection: '',
            sortBy: '',
          };
          const res = await runGetAllUser({
            ...filterParams,
            ...pageRequestParams,
          });

          return {
            data: res?.items || [],
          };
        }}
        columns={columns}
        options={false}
        // rowSelection={{
        //     onChange: (_, selectedRows) => {
        //         setSelectedRows(selectedRows);
        //     },
        // }}
        scroll={{ x: 'max-content', y: 'max-content' }}
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
      />

      <NewUserForm
        title="Tạo người dùng mới"
        width="934px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.UserResponse);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
            return true;
          }
          return false;
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
      </NewUserForm>
      <UserDetailDrawer
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        userAvatar=""
      />
    </PageContainer>
  );
};

export default UserManagementTable;
