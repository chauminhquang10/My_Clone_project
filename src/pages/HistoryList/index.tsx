import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { useRequest } from 'umi';
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties/TableCell';
import { getSystemOperation } from '@/services/STM-APIs/STMController';
import { Tooltip } from 'antd';

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

  const columns: ProColumns<API.SystemOperationResponse>[] = [
    {
      title: 'Id',
      key: 'id',
      dataIndex: 'id',
      hideInTable: true,
    },
    {
      title: <HeadCell>Thao tác</HeadCell>,
      key: 'action',
      width: '20%',
      dataIndex: 'action',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
    },
    {
      title: <HeadCell>Thực hiện bởi</HeadCell>,
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: '20%',
      render: (_, entity) => {
        return <TextCell>{entity.createdBy?.id + ' - ' + entity.createdBy?.name}</TextCell>;
      },
    },
    {
      title: <HeadCell>Chức năng</HeadCell>,
      key: 'module',
      dataIndex: 'module',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
    },
    {
      title: <HeadCell>Thời gian thực hiện</HeadCell>,
      dataIndex: 'time',
      key: 'time',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
    },
    {
      title: <HeadCell>Mô tả</HeadCell>,
      dataIndex: 'content',
      key: 'content',
      render: (dom) => {
        return (
          <Tooltip placement="bottom" title={dom}>
            <div>
              <TextCell>{dom}</TextCell>
            </div>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <PageContainer
      className={style['table-container']}
      header={{
        title: '',
      }}
      footer={undefined}
    >
      <ProTable
        headerTitle={<TitleTable>Danh sách lịch sử</TitleTable>}
        rowKey="key"
        search={false}
        toolBarRender={false}
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
