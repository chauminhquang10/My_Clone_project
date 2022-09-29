import type { ProColumns } from '@ant-design/pro-components';
// import { getAllUsers } from "@/services/STM-APIs/UserController";
import { PageContainer, ProTable } from '@ant-design/pro-components';
// import { message } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { Access, FormattedMessage, useModel, useRequest } from 'umi';
import Column from './components/tables/Column';
// import SelectPage from "./components/tables/SelectPage";
import ExportFile from '@/components/TableProperties/ExportFile';
import style from '@/components/TableProperties/style.less';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import api from '@/services/STM-APIs';
import { openNotification } from '@/utils';
import { Typography } from 'antd';
import AnaylyticDetail from '../MachineTable/components/drawers/AnalyticDetail';
import NoFoundPage from '../404';

const TableCustom = () => {
  //------------ pagination --------------------
  const { initialState } = useModel('@@initialState');
  const accessiable = useMemo(
    () => initialState?.currentRoles?.view_transaction,
    [initialState?.currentRoles?.view_transaction],
  );
  const pageSizeRef = useRef<number>(20);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const [paramFilter, setParamFilter] = useState<API.getListMachinesParams | undefined>();
  const { data: listActivity, run: runGetAllActivity } = useRequest(
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
      ready: accessiable,
    },
  );

  const [showDetail, setShowDetail] = useState<boolean>(false);

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
    <Access accessible={accessiable || false} fallback={<NoFoundPage />}>
      <PageContainer
        className={style['table-container']}
        header={{
          title: '',
        }}
        footer={undefined}
      >
        <ProTable
          headerTitle={
            <Typography.Title level={4} style={{ margin: 0 }}>
              <FormattedMessage id="menu.machine-management.analytics" />
            </Typography.Title>
          }
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
          scroll={{ x: 'max-content' }}
        />

        <AnaylyticDetail
          handleClose={() => setShowDetail(false)}
          open={showDetail}
          currentEntity={currentRow}
          runGetAllActivity={() => {
            runGetAllActivity();
          }}
        />
      </PageContainer>
    </Access>
  );
};

export default TableCustom;
