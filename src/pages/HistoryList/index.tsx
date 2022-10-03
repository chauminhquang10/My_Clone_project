import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import { getSystemOperation } from '@/services/STM-APIs/STMController';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { FormattedMessage, useIntl, useRequest } from 'umi';
import Column from './components/tables/Column';

const HistoryListTable = () => {
  const intl = useIntl();
  const pageSizeRef = useRef<number>(20);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [paramFilter, setParamFilter] = useState<API.getListMachinesParams | undefined>();
  // const [totalPage, setTotalPage] = useState<number>(1);

  //-------------- Pagination props --------------------------------
  const paginationLocale = {
    items_per_page: '',
    jump_to: intl.formatMessage({ id: 'page' }),
    page: '',
  };

  const { data: listHistory } = useRequest<API.ResponseBasePageResponseSystemOperationResponse>(
    () => {
      const params: API.getSystemOperationParams = {
        ...paramFilter,
        pageNumber: page - 1,
        pageSize: pageSizeRef.current,
      };
      return getSystemOperation(params);
    },
    {
      onSuccess(data) {
        setTotalSize(data?.totalSize as number);
      },
      onError(error) {
        console.log('error', error);
      },
      refreshDeps: [paramFilter, page],
    },
  );

  const columns = Column({ paramFilter, setParamFilter });

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
        dataSource={listHistory?.items}
        columns={columns}
        options={false}
        pagination={{
          onChange(current) {
            setPage(current);
          },
          current: page,
          total: totalSize,
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
    </PageContainer>
  );
};

export default HistoryListTable;
