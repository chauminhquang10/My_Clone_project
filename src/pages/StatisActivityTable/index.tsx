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
          <ExportFile
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          />,
        ]}
        // dataSource={listMachine}
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

      <AnaylyticDetail
        handleClose={() => setShowDetail(false)}
        open={showDetail}
        currentEntity={currentRow}
      />
    </PageContainer>
  );
};

export default TableCustom;
