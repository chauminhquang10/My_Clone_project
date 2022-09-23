import AddNew from '@/components/TableProperties/AddNew';
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import Api from '@/services/STM-APIs';
import { openNotification } from '@/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';
import { useRequest } from 'umi';
import { NewUserForm, UserDetailDrawer } from './components/forms';
import Column from './components/tables/Column';

const handleAdd = async (fields: API.CreateUserRequest, avatar?: File) => {
  const hide = message.loading('Loading...');
  hide();
  try {
    const res = await Api.UserController.createUser({ ...fields }, avatar);
    if (!res) return false;

    if (res.code === 0) {
      message.success('Thêm người dùng thành công');
      return true;
    }

    switch (res.code) {
      case 100:
        openNotification('error', 'Email đã được sử dụng');
        return false;
      case 101:
        openNotification('error', 'Số điện thoại đã được sử dụng');
        return false;
      case 106:
        openNotification('error', 'Mã nhân viên đã được sử dụng');
        return false;
      case 107:
        openNotification('error', 'Email đã được sử dụng');
        return false;
      case 108:
        openNotification('error', 'Số điện thoại người quản lý đã tồn tại');
        return false;
      default:
        message.error('Thêm người dùng không thành công, vui lòng thử lại sau!');
        return false;
    }
  } catch (error) {
    hide();
    message.error('Thêm người dùng không thành công, vui lòng thử lại sau!');
    return false;
  }
};

const UserManagementTable: React.FC = () => {
  //------------ pagination --------------------
  const pageSizeRef = useRef<number>(20);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const { run: runGetAllUser } = useRequest(
    (params: API.getAllUsersParams) => Api.UserController.getAllUsers(params),
    {
      manual: true,
      onSuccess: (res) => {
        if (!res) {
          openNotification('error', 'Đã xảy ra lỗi', 'Vui lòng thử lại sau');
          return;
        }
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
  const columns: ProColumns<API.UserResponse>[] = Column({
    setCurrentRow,
    setShowDetail,
  });

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
            enableCreateNew={true}
            onClick={() => {
              handleModalVisible(true);
            }}
          />,
        ]}
        request={async () => {
          const filterParams = {
            managementUnit: '',
            staffId: '',
          };

          const pageRequestParams = {
            pageNumber: page - 1,
            pageSize: pageSizeRef.current,
            sortBy: '',
          };
          const res = await runGetAllUser({
            ...filterParams,
            ...pageRequestParams,
          });

          setTotalSize(res?.totalSize as number);
          console.log(res);
          return {
            data: res?.items || [],
          };
        }}
        columns={columns}
        options={false}
        scroll={{ x: 'max-content', y: 'max-content' }}
        pagination={{
          total: totalSize,
          onChange(current) {
            setPage(current);
          },
          current: page,
          className: style['pagination-custom'],
          locale: { ...paginationLocale },
          showSizeChanger: false,
          pageSize: pageSize.current,
          showTotal: (total, range) => <TotalPagination total={total} range={range} />,
          hideOnSinglePage: false,
          showQuickJumper: true,
        }}
      />

      <NewUserForm
        title="Tạo người dùng mới"
        width="934px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (values, avatar) => {
          const success = await handleAdd(values as API.CreateUserRequest, avatar);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
            return true;
          }
          return false;
        }}
      />
      <UserDetailDrawer
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        actionRef={actionRef}
      />
    </PageContainer>
  );
};

export default UserManagementTable;
