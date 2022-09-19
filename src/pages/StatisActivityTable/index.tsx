import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
// import { useEffect } from 'react';
import { useRequest } from 'umi';
import AddNew from '@/components/TableProperties/AddNew';
import Column from './components/tables/Column';
// import SelectPage from "./components/tables/SelectPage";
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import api from '@/services/STM-APIs';
import { openNotification } from '@/utils';

// const APIForDetail = (currentEntity: API.StmInfoResponse) => {
//   const [detailTransaction, setDetailTransaction] = useState<
//     API.ListTransactionsResponse | undefined
//   >();

//   const [fromDate, setFromDate] = useState<string>('');
//   const [toDate, setToDate] = useState<string>('');
//   const { run: getDetailTransaction } = useRequest(
//     (params: API.getTransactionsParams) => api.TransactionController.getTransactions(params),
//     {
//       manual: true,
//       onSuccess: (res) => {
//         if (!res) {
//           openNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau');
//         } else {
//           setDetailTransaction(res);
//         }
//       },
//       onError: (error) => {
//         console.log(error);
//       },
//     },
//   );
//   useEffect(() => {
//     const params: API.getTransactionsParams = {
//       machineId: currentEntity.id || '',
//       from: fromDate,
//       to: toDate,
//     };
//     getDetailTransaction(params);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentEntity, fromDate, toDate]);
//   return <div>ihi</div>;
// };

const TableCustom = () => {
  //---------------  handle getAllTransaction -------------------------------

  const { run: getAllTransaction } = useRequest(
    (params: API.getTransactionConfigurationParams) =>
      api.TransactionController.getTransactionConfiguration(params),
    {
      manual: true,
      onSuccess: (res) => {
        if (!res) {
          openNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau');
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
  console.log(createModalVisible);

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
  const columns: ProColumns<API.TransactionConfigurationResponse>[] = Column({
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
        headerTitle={<TitleTable>Thống kê hoạt động</TitleTable>}
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
        request={async (params = {}) => {
          console.log(params);

          const pageRequestParams = {
            // pageNumber: params.current,
            // pageSize: params.pageSize,
            // sortDirection: '',
            sortBy: '',
          };
          const res = await getAllTransaction({
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
    </PageContainer>
  );
};

export default TableCustom;
