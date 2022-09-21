import type { ActionType, ProColumns } from '@ant-design/pro-components';
// import { getAllUsers } from "@/services/STM-APIs/UserController";
import AddNew from '@/components/TableProperties/AddNew';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import Column from './components/tables/Column';
// import SelectPage from "./components/tables/SelectPage";
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import DeclareMachineSeriesForm from './components/drawers/DeclareMachineSeriesForm';
import ConfigMachineDrawer from './components/drawers/MachineDetailForm';

const TableCustom = () => {
  // //-------------- Create model ----------------

  // const { run: createSTMModel } = useRequest(
  //   (params: API.CreateStmModelRequest) => api.STMModelController.createModel(params),
  //   {
  //     manual: true,
  //     onSuccess: () => {
  //       openNotification('success', 'Thành công');
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //   },
  // );
  // const paramCreate: API.CreateStmModelRequest = {
  //   machineType: 'STM',
  //   name: '',
  //   storages: [
  //     {
  //       deviceTypeId: 1,
  //       minCapacity: 1000,
  //     },
  //   ],
  // };

  // createSTMModel(paramCreate);

  // //-------------- Update model ----------------

  // const { run: updateSTMModel } = useRequest(
  //   (params: API.updateModelParams, body: API.UpdateModelRequest) =>
  //     api.STMModelController.updateModel(params, body),
  //   {
  //     manual: true,
  //     onSuccess: () => {
  //       openNotification('success', 'Thành công');
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //   },
  // );
  // const paramsUpdate: API.updateModelParams = {
  //   modelId: '',
  // };

  // const bodyUpdate: API.UpdateModelRequest = {
  //   name: '',
  //   storages: [
  //     {
  //       deviceTypeId: 0,
  //       minCapacity: 100,
  //     },
  //   ],
  // };

  // updateSTMModel(paramsUpdate, bodyUpdate);
  //---------------  handle get All Model -------------------------------

  // const { run: getAllConfigMachine } = useRequest(
  //   (params: API.getListModelsParams) => api.STMModelController.getListModels(params),
  //   {
  //     manual: true,
  //     onSuccess: (res) => {
  //       if (!res) {
  //         openNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau');
  //       }
  //       return res;
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //   },
  // );
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  // const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.StorageItem>();

  console.log(showDetail, currentRow);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  console.log(createModalVisible);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  // const [page, setPage] = useState<number>();
  // const [pageSize, setPageSize] = useState<number>();
  // const pageSizeRef = useRef<number>(20);
  const columns: ProColumns<API.StorageItem>[] = Column({
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
    <>
      <DeclareMachineSeriesForm
        onFinish={async () => {
          return true;
        }}
        onVisibleChange={handleModalVisible}
        visible={createModalVisible}
        width="934px"
      />
      <ConfigMachineDrawer open handleClose={() => {}} />
      <PageContainer
        className={style['table-container']}
        header={{
          title: '',
        }}
        footer={undefined}
      >
        <ProTable
          headerTitle={<TitleTable>Cấu hình dòng máy</TitleTable>}
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
          // request={machineList}
          request={async (params = {}) => {
            console.log(params);

            // const pageRequestParams: API.getListModelsParams = {
            //   machineType: '',
            // };
            // const res = await getAllConfigMachine({
            //   ...pageRequestParams,
            // });

            return {
              data: [],
              // data: res?.models || [],
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
    </>
  );
};

export default TableCustom;
