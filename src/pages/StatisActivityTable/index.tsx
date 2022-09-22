import type { ActionType, ProColumns } from '@ant-design/pro-components';
// import { getAllUsers } from "@/services/STM-APIs/UserController";
import { PageContainer, ProTable } from '@ant-design/pro-components';
// import { message } from 'antd';
import { useRef, useState } from 'react';
import { useRequest } from 'umi';
import Column from './components/tables/Column';
// import SelectPage from "./components/tables/SelectPage";
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import AnaylyticDetail from '../MachineTable/components/drawers/AnalyticDetail';
import api from '@/services/STM-APIs';
import { openNotification } from '@/utils';
import ExportFile from '@/components/TableProperties/ExportFile';

const TableCustom = () => {
  //------------ pagination --------------------
  const pageSizeRef = useRef<number>(20);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const { run: getAllTransaction } = useRequest(
    (params: API.getTransactionConfigurationParams) =>
      api.TransactionController.getTransactionConfiguration(params),
    {
      manual: true,
      onSuccess: (res) => {
        if (!res) {
          openNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau');
        }
        // setListTransaction(res?.items);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  console.log(createModalVisible);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.StmInfoResponse>();

  const columns: ProColumns<API.TransactionConfigurationResponse>[] = Column({
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
        headerTitle={<TitleTable>Thống kê hoạt động</TitleTable>}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <ExportFile
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          />,
        ]}
        request={async (params = {}) => {
          console.log(params);

          const pageRequestParams = {
            pageNumber: page - 1,
            pageSize: pageSizeRef.current,
            sortBy: '',
          };
          const res = await getAllTransaction({
            ...pageRequestParams,
          });
          setTotalSize(res?.totalSize as number);
          return {
            data: res?.items || [],
          };
        }}
        columns={columns}
        options={false}
        pagination={{
          onChange(current) {
            setPage(current);
          },
          total: totalSize,
          current: page,
          className: style['pagination-custom'],
          locale: { ...paginationLocale },
          showSizeChanger: false,
          pageSize: pageSize.current,
          showTotal: (total, range) => <TotalPagination total={total} range={range} />,
          hideOnSinglePage: true,
          showQuickJumper: true,
        }}
      />

      <AnaylyticDetail
        handleClose={() => setShowDetail(false)}
        open={showDetail}
        currentEntity={currentRow}
      />
    </PageContainer>
  );
};

export default TableCustom;
