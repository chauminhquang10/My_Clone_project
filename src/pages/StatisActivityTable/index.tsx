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

  const [paramFilter, setParamFilter] = useState<API.getListMachinesParams | undefined>();
  const { data: listActivity } = useRequest(
    () => {
      const params: API.getTransactionConfigurationParams = {
        ...paramFilter,
        pageNumber: page - 1,
        pageSize: pageSizeRef.current,
      };
      return api.TransactionController.getTransactionConfiguration(params);
    },
    {
      onSuccess: (res) => {
        if (!res) {
          openNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau');
        }
        setTotalSize(res?.totalSize as number);
      },
      onError: (error) => {
        console.log(error);
      },
      refreshDeps: [page, paramFilter],
    },
  );

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.StmInfoResponse>();

  const columns: ProColumns<API.TransactionConfigurationResponse>[] = Column({
    setCurrentRow,
    setShowDetail,
    paramFilter,
    setParamFilter,
  });

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
        toolBarRender={() => [<ExportFile key="primary" onClick={() => {}} />]}
        columns={columns}
        options={false}
        dataSource={listActivity?.items}
        pagination={{
          onChange(current) {
            setPage(current);
          },

          total: totalSize,
          current: page,
          className: style['pagination-custom'],
          locale: { ...paginationLocale },
          showSizeChanger: false,
          pageSize: pageSizeRef.current,
          showTotal: (total, range) => <TotalPagination total={total} range={range} />,
          hideOnSinglePage: true,
          showQuickJumper: true,
        }}
      />

      <AnaylyticDetail
        handleClose={() => setShowDetail(false)}
        open={showDetail}
        currentEntity={currentRow}
        actionRef={actionRef}
      />
    </PageContainer>
  );
};

export default TableCustom;
