import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import api from '@/services/STM-APIs';
import { openNotification } from '@/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { useIntl, useRequest } from 'umi';
import DownloadLogForm from './components/DownloadLogForm';
import Column from './components/tables/Column';

const TableCustom = () => {
  const intl = useIntl();
  //------------ pagination --------------------
  const pageSizeRef = useRef<number>(20);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [openLogForm, setOpenLogForm] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.StmInfoResponse>();
  const [paramFilter, setParamFilter] = useState<API.getListModelsParams | undefined>();
  //----------- get all machine ---------------------
  const { data: listActivity } = useRequest(
    () => {
      const params: API.getListMachinesParams = {
        ...paramFilter,
        pageNumber: page - 1,
        pageSize: pageSizeRef.current,
      };
      return api.STMController.getListMachines(params);
    },
    {
      cacheKey: 'listMachine',
      onSuccess: (res) => {
        if (!res) {
          openNotification('error', intl.formatMessage({ id: 'notificationError' }));
        }
        setTotalSize(res?.totalSize as number);
        return res;
      },
      onError: (error) => {
        console.log(error);
      },
      refreshDeps: [paramFilter, page],
    },
  );
  const columns: ProColumns<API.StmInfoResponse>[] = Column({
    setOpenLogForm,
    setCurrentRow,
    setParamFilter,
    paramFilter,
  });

  //-------------- Pagination props --------------------------------
  const paginationLocale = {
    items_per_page: '',
    jump_to: intl.formatMessage({ id: 'page' }),
    page: '',
  };

  return (
    <>
      <PageContainer
        className={style['table-container']}
        header={{
          title: '',
        }}
        footer={undefined}
      >
        <ProTable
          headerTitle={<TitleTable>Activity Logs</TitleTable>}
          rowKey="key"
          search={false}
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
            pageSize: pageSizeRef.current,
            showTotal: (total, range) => <TotalPagination total={total} range={range} />,
            hideOnSinglePage: true,
            showQuickJumper: true,
          }}
          dataSource={listActivity?.items}
          scroll={{ x: 'max-content' }}
        />
      </PageContainer>

      <DownloadLogForm
        title="Download activity log"
        width="934px"
        machine={currentRow}
        visible={openLogForm}
        onVisibleChange={setOpenLogForm}
      />
    </>
  );
};

export default TableCustom;
