// import { addRule } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
// import { getAllUsers } from "@/services/STM-APIs/UserController";
import { PageContainer, ProTable } from '@ant-design/pro-components';
// import { message } from 'antd';
import { useRef, useState } from 'react';
// import {useRequest} from "umi";
import AddNew from '@/components/TableProperties/AddNew';
import Column from './components/tables/Column';
// import SelectPage from "./components/tables/SelectPage";
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import AddNewMachine from './components/forms/AddNewMachine';
import MachineDrawer from './MachineDrawer';

const MachineType: ('UNKNOWN' | 'STM' | 'CDM' | 'ATM' | undefined)[] = [
  'STM',
  'CDM',
  'ATM',
  'UNKNOWN',
];

const StatusMachine: ('UNKNOWN' | 'OFFLINE' | 'IN_SERVICE' | 'OUT_OF_SERVICE' | undefined)[] = [
  'UNKNOWN',
  'OFFLINE',
  'IN_SERVICE',
  'OUT_OF_SERVICE',
];

const Activity: ('UNKNOWN' | 'MAINTAINING' | 'UPGRADE' | 'DISCONNECTED' | undefined)[] = [
  'UNKNOWN',
  'MAINTAINING',
  'UPGRADE',
  'DISCONNECTED',
];

const Location: string[] = ['Miền Bắc', 'Miền Trung', 'Miền Nam'];

const genListMachine = (current: number, pageSize: number) => {
  const tableListDataSource: API.StmInfoResponse[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: `${index}`,
      machineOrder: index * 1000,
      name: `name-${index}`,
      location: Location[Math.floor(Math.random() * Location.length)],
      province: {
        id: 1,
        name: `province-${index}`,
      },
      machineType: MachineType[Math.floor(Math.random() * MachineType.length)],
      terminalId: `terminal-${index}`,
      status: StatusMachine[Math.floor(Math.random() * StatusMachine.length)],
      activity: Activity[Math.floor(Math.random() * Activity.length)],
      ipAddress: `ipAddress-${index}`,
    });
  }
  return tableListDataSource;
};

const listMachine = genListMachine(1, 100);

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
// const handleAdd = async (fields: API.StmInfoResponse) => {
//   const hide = message.loading('正在添加');
//   try {
//     await addRule({ ...fields });
//     hide();
//     message.success('Added successfully');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Adding failed, please try again!');
//     return false;
//   }
// };

const TableCustom = () => {
  //--------------- listUSer -----------------------------------
  // const [listUser, setListUser] = useState<API.StmInfoResponse[] | undefined>();
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
  const [currentRow, setCurrentRow] = useState<API.StmInfoResponse>();

  console.log(showDetail, currentRow);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  // const [page, setPage] = useState<number>();
  // const [pageSize, setPageSize] = useState<number>();
  // const pageSizeRef = useRef<number>(20);
  const columns: ProColumns<API.StmInfoResponse>[] = Column({
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
        // request={machineList}
        dataSource={listMachine}
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

      <MachineDrawer open={showDetail} handleClose={() => setShowDetail(false)} />
      <AddNewMachine handleModalVisible={handleModalVisible} visible={createModalVisible} />
    </PageContainer>
  );
};

export default TableCustom;
