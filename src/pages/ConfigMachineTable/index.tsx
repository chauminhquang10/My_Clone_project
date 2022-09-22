import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';

import { useRef, useState } from 'react';
import { useModel, useRequest } from 'umi';
import AddNew from '@/components/TableProperties/AddNew';
import Column from './components/tables/Column';
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
// import { message } from 'antd';
import { getListModels } from '@/services/STM-APIs/STMModelController';
import ConfigModelDetailDrawer from './components/forms/ConfigModelDetailDrawer';
import NewConfigModelForm from './components/forms/NewConfigModel';

const TableCustom = () => {
  // get current user info
  const { initialState } = useModel('@@initialState');

  // xử lí cho phép tạo mới
  const [enableCreateNew, setEnableCreateNew] = useState<boolean>(true);

  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.StmModelResponse>();

  const columns: ProColumns<API.StmModelResponse>[] = Column({
    setCurrentRow,
    setShowDetail,
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = useRef<number>(10);
  // const [totalPage, setTotalPage] = useState<number>(1);

  //-------------- Pagination props --------------------------------
  const paginationLocale = {
    items_per_page: '',
    jump_to: 'Trang',
    page: '',
  };

  const { run: runGetAllConfigModels } = useRequest<API.ResponseBaseListStmModelResponse>(
    (params: API.getListModelsParams) => getListModels(params),
    {
      manual: true,
      onSuccess(data) {
        console.log(data);
        if (!initialState?.currentUser?.admin) {
          setEnableCreateNew(false);
        }
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

  // const handleAddNewUnit = async (record: API.CreateManagementUnitRequest) => {
  //   const hide = message.loading('Loading...');

  //   try {
  //     const res = await createManagementUnit({ ...record });
  //     hide();
  //     if (res.code === 700) {
  //       message.error(`${record.name} ${record.code} ${record.address} đã được sử dụng`);
  //       return;
  //     }
  //     message.success('Thêm đơn vị mới thành công');
  //     handleCreateModalVisible(false);
  //     actionRef.current?.reload();
  //   } catch (error) {
  //     hide();
  //     message.error('Adding failed, please try again!');
  //   }
  // };

  return (
    <PageContainer
      className={style['table-container']}
      header={{
        title: '',
      }}
      footer={undefined}
    >
      <ProTable
        headerTitle={<TitleTable>Đơn vị quản lý</TitleTable>}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <AddNew
            key="primary"
            enableCreateNew={enableCreateNew}
            onClick={() => {
              handleCreateModalVisible(true);
            }}
          />,
        ]}
        request={async () => {
          const res = await runGetAllConfigModels({ machineType: 'STM' });
          return {
            data: res?.models,
            total: res?.models ? res.models.length : 0,
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
        onRow={(rowData) => ({
          onClick: () => {
            setCurrentRow(rowData);
          },
        })}
      />

      {createModalVisible && (
        <NewConfigModelForm
          title="Tạo đơn vị quản lý mới"
          width="934px"
          visible={createModalVisible}
          onVisibleChange={handleCreateModalVisible}
          onFinish={async (value) => {
            console.log(value);
            // await handleAddNewUnit(value as API.CreateManagementUnitRequest);
          }}
        />
      )}

      {showDetail && (
        <ConfigModelDetailDrawer
          showDetail={showDetail}
          setShowDetail={setShowDetail}
          currentModel={currentRow || {}}
          setCurrentModel={setCurrentRow}
          detailActionRef={actionRef}
        />
      )}
    </PageContainer>
  );
};

export default TableCustom;
