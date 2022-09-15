import { addRule } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
// import { getAllUsers } from "@/services/STM-APIs/UserController";
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';
// import {useRequest} from "umi";
import NewRoleListForm from './components/forms/NewRoleListForm';
import AddNew from '@/components/TableProperties/AddNew';
import Column from './components/tables/Column';
// import SelectPage from "./components/tables/SelectPage";
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import RoleListDetailDrawer from './components/forms/RoleListDetailDrawer';

const genGroupAuthorize = (current: number, pageSize: number) => {
  const tableListDataSource: API.RoleGroupResponse[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: index,
      name: `name-${index}`,
      createdAt: `${new Date()}`,
      createdBy: {
        name: `name-${index}`,
        avatar:
          'https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg',
        id: `${index}`,
      },
      users: [
        {
          name: `name-${index}`,
          avatar:
            'https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg',
          id: `1`,
        },
        {
          name: `name-${index}`,
          avatar:
            'https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg',
          id: `2`,
        },
        {
          name: `name-${index}`,
          avatar:
            'https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg',
          id: `3`,
        },
        {
          name: `name-${index}`,
          avatar:
            'https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg',
          id: `4`,
        },
        {
          name: `name-${index}`,
          avatar:
            'https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg',
          id: `5`,
        },
        {
          name: `name-${index}`,
          avatar:
            'https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg',
          id: `6`,
        },
      ],
    });
  }
  return tableListDataSource;
};

const listGroupAuthorize = genGroupAuthorize(1, 100);

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RoleGroupResponse) => {
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

const TableCustom = () => {
  //--------------- listUSer -----------------------------------
  // const [listUser, setListUser] = useState<API.RoleGroupResponse[] | undefined>();
  //---------------  handle getAllUser -------------------------------

  // const { run: runGetAllUser } = useRequest(
  //     (params: API.getAllUsersParams) => getAllUsers(params),
  //     {
  //         manual: true,
  //         onSuccess: (res) => {
  //             const data = res as API.ResponseBasePageResponseObject;
  //             const listUserRespone = data.data?.items;
  //             setListUser(listUserRespone);
  //         },
  //         onError: (error) => {
  //             console.log(error);
  //         },
  //     }
  // );
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
  const [currentRow, setCurrentRow] = useState<API.RoleGroupResponse>();

  console.log(showDetail, currentRow);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

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

  return (
    <PageContainer
      className={style['table-container']}
      header={{
        title: '',
      }}
      footer={undefined}
    >
      <ProTable
        headerTitle={<TitleTable>Danh sách máy</TitleTable>}
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
        // request={groupAuthorizeList}
        dataSource={listGroupAuthorize}
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
          className: style['pagination-custom'],
          locale: { ...paginationLocale },
          showSizeChanger: false,
          pageSize: pageSize.current,
          showTotal: (total, range) => <TotalPagination total={total} range={range} />,
          hideOnSinglePage: true,
          showQuickJumper: true,
        }}
      />

      <NewRoleListForm
        title="Tạo nhóm quyền"
        width="934px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RoleGroupResponse);
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
      <RoleListDetailDrawer
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        showDetail={showDetail}
        setShowDetail={setShowDetail}
      />
    </PageContainer>
  );
};

export default TableCustom;
