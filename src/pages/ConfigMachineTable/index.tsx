import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { useIntl, useModel, useRequest } from 'umi';
import AddNew from '@/components/TableProperties/AddNew';
import Column from './components/tables/Column';
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import { createModel, getListModels } from '@/services/STM-APIs/STMModelController';
import ConfigModelDetailDrawer from './components/forms/ConfigModelDetailDrawer';
import NewConfigModelForm from './components/forms/NewConfigModel';
import { message } from 'antd';

type CustomPhysicalDevice = API.PhysicalDevice & {
  key: React.Key;
  myMinCap: number;
};

const TableCustom = () => {
  const intl = useIntl();

  // get current user info
  const { initialState } = useModel('@@initialState');

  // xử lí cho phép tạo mới
  const [enableCreateNew, setEnableCreateNew] = useState<boolean>(true);

  // xử lí data cho cái bảng god damn editable row
  const [dataSource, setDataSource] = useState<CustomPhysicalDevice[]>([]);

  // xử lí những thiết bị đc chọn để update
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.StmModelResponse>();

  const [paramFilter, setParamFilter] = useState<API.getListModelsParams | undefined>();

  //------------ pagination --------------------
  const pageSizeRef = useRef<number>(20);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const columns: ProColumns<API.StmModelResponse>[] = Column({
    setCurrentRow,
    setShowDetail,
    setParamFilter,
    paramFilter,
  });

  // const [totalPage, setTotalPage] = useState<number>(1);

  //-------------- Pagination props --------------------------------
  const paginationLocale = {
    items_per_page: '',
    jump_to: 'Trang',
    page: '',
  };

  const { data: listConFigMachine, run: getAllConfigMachine } =
    useRequest<API.ResponseBasePageResponseStmModelResponse>(
      () => {
        const params: API.getListModelsParams = {
          ...paramFilter,
          pageSize: pageSizeRef.current,
          pageNumber: page - 1,
        };
        return getListModels(params);
      },
      {
        onSuccess(data) {
          setTotalSize(data?.totalSize as number);
          if (!initialState?.currentRoles?.create_model) {
            setEnableCreateNew(false);
          }
        },
        onError(error) {
          console.log('error', error);
          // notification.error({
          //   message: messageErrorData,
          //   description: e?.data?.code,
          // });
        },
        refreshDeps: [paramFilter, page],
      },
    );

  const handleAddNewModel = async (value: { machineType: string; name: string }) => {
    const hide = message.loading('Loading...');

    try {
      // format data before create
      const newDataSource = [...dataSource];
      const newSelectedDataSource = newDataSource?.filter((item) =>
        selectedRowKeys?.includes(item?.id as number),
      );

      const formattedForSendingData = newSelectedDataSource?.map((item) => ({
        deviceTypeId: item?.id,
        minCapacity: item?.myMinCap,
      }));

      const success = await createModel({
        ...value,
        storages: formattedForSendingData,
      } as API.CreateStmModelRequest);
      hide();
      if (success.code === 312) {
        message.error('Đã tồn tại tên dòng máy');
        return false;
      } else {
        message.success(
          intl.formatMessage({
            id: 'createConfigMachine_successStatus_message',
          }),
        );
        handleCreateModalVisible(false);
        getAllConfigMachine();
        return true;
      }
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
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
        headerTitle={
          <TitleTable>
            {intl.formatMessage({
              id: 'configMachine_tableTitle',
            })}
          </TitleTable>
        }
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
        dataSource={listConFigMachine?.items}
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
        onRow={(rowData) => ({
          onClick: () => {
            setCurrentRow(rowData);
          },
        })}
      />

      {createModalVisible && (
        <NewConfigModelForm
          title={intl.formatMessage({
            id: 'createForm_title',
          })}
          width="934px"
          dataSource={dataSource}
          setDataSource={setDataSource}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          visible={createModalVisible}
          onVisibleChange={handleCreateModalVisible}
          onFinish={async (value: { machineType: string; name: string }) => {
            return await handleAddNewModel(value);
          }}
        />
      )}

      {showDetail && (
        <ConfigModelDetailDrawer
          showDetail={showDetail}
          setShowDetail={setShowDetail}
          currentModel={currentRow || {}}
          setCurrentModel={setCurrentRow}
          getAllConfigMachine={() => {
            getAllConfigMachine();
          }}
        />
      )}
    </PageContainer>
  );
};

export default TableCustom;
