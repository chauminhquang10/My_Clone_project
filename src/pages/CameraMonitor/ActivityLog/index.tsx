import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import api from '@/services/STM-APIs';
import { openNotification } from '@/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { useRequest } from 'umi';
import DownloadLogForm from './components/DownloadLogForm';
import Column from './components/tables/Column';

const TableCustom = () => {
  //------------ pagination --------------------
  const pageSizeRef = useRef<number>(20);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [openLogForm, setOpenLogForm] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.StmInfoResponse>();
  //----------- get all machine ---------------------
  const { run: runGetAllMachine } = useRequest(
    (params: API.getListMachinesParams) => api.STMController.getListMachines(params),
    {
      manual: true,
      cacheKey: 'listMachine',
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
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.StmInfoResponse>[] = Column({
    setOpenLogForm,
    setCurrentRow,
  });

  //-------------- Pagination props --------------------------------
  const paginationLocale = {
    items_per_page: '',
    jump_to: 'Trang',
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
          headerTitle={<TitleTable>Danh sách máy</TitleTable>}
          actionRef={actionRef}
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
          request={async () => {
            const params: API.getListMachinesParams = {
              pageNumber: page - 1,
              pageSize: pageSizeRef.current,
            };
            const res = await runGetAllMachine(params);
            setTotalSize(res?.totalSize as number);
            return {
              data: res?.items || [],
            };
          }}
        />
      </PageContainer>

      <DownloadLogForm
        title="Tải log hoạt động"
        width="934px"
        machine={currentRow}
        visible={openLogForm}
        onVisibleChange={setOpenLogForm}
      />
    </>
  );
};

export default TableCustom;
