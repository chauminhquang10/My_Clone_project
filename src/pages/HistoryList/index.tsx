import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import { getSystemOperation } from '@/services/STM-APIs/STMController';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { FormattedMessage, useRequest } from 'umi';
import Column from './components/tables/Column';

const HistoryListTable = () => {
  // const [resultResponse, setResultResponse] = useState<API.PageResponseManagementUnitResponse>();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = useRef<number>(10);
  // const [totalPage, setTotalPage] = useState<number>(1);

  //-------------- Pagination props --------------------------------
  const paginationLocale = {
    items_per_page: '',
    jump_to: 'Trang',
    page: '',
  };

  const { run: runGetAllSystemOperations } =
    useRequest<API.ResponseBasePageResponseSystemOperationResponse>(
      (params: API.getSystemOperationParams) => getSystemOperation(params),
      {
        onSuccess(data) {
          console.log(data);
          // setResultResponse(data);
          // const dataNew = data as API.BaseResponseListLanguageSupport;
          // if (dataNew?.success && dataNew.data) {
          //   setListSupportLanguages(dataNew.data);
          // }
        },
        onError(error) {
          console.log('error', error);
          // notification.error({
          //   message: messageErrorData,
          //   description: e?.data?.code,
          // });
        },
      },
    );

  const columns = Column();

  return (
    <PageContainer
      className={style['table-container']}
      header={{
        title: '',
      }}
      footer={undefined}
    >
      <ProTable
        headerTitle={
          <TitleTable>
            <FormattedMessage id="historyList.header.title" />
          </TitleTable>
        }
        rowKey="key"
        search={false}
        request={async () => {
          const res = await runGetAllSystemOperations();
          return {
            data: res?.items,
            total: res?.items ? res.items.length : 0,
            success: true,
          };
        }}
        columns={columns}
        options={false}
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

export default HistoryListTable;
