import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import UnitDetailDrawer from './components/forms/UnitDetailDrawer';
import { useRef, useState } from 'react';
import { useRequest } from 'umi';
import AddNew from '@/components/TableProperties/AddNew';
import Column from './components/tables/Column';
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import NewUnitForm from './components/forms/NewUnitForm';
import {
  createManagementUnit,
  getAllManagementUnits,
} from '@/services/STM-APIs/ManagementUnitController';
import { message } from 'antd';

const TableCustom = () => {
  // const [resultResponse, setResultResponse] = useState<API.PageResponseManagementUnitResponse>();

  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  // xử lí xem chi tiết của đơn vị
  const [currentUnit, setCurrentUnit] = useState<API.ManagementUnitResponse>();

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ManagementUnitResponse>();

  const columns: ProColumns<API.ManagementUnitResponse>[] = Column({
    setCurrentRow,
    setShowDetail,
  });

  console.log(currentRow);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = useRef<number>(10);
  // const [totalPage, setTotalPage] = useState<number>(1);

  //-------------- Pagination props --------------------------------
  const paginationLocale = {
    items_per_page: '',
    jump_to: 'Trang',
    page: '',
  };

  const { run: runGetAllManagementUnits } =
    useRequest<API.ResponseBasePageResponseManagementUnitResponse>(
      (params: API.getAllManagementUnitsParams) => getAllManagementUnits(params),
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

  const handleAddNewUnit = async (record: API.CreateManagementUnitRequest) => {
    const hide = message.loading('Loading...');

    try {
      await createManagementUnit({ ...record });
      hide();
      message.success('Thêm đơn vị mới thành công');
      handleCreateModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
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
        headerTitle={<TitleTable>Đơn vị quản lý</TitleTable>}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <AddNew
            key="primary"
            onClick={() => {
              handleCreateModalVisible(true);
            }}
          />,
        ]}
        request={async () => {
          const res = await runGetAllManagementUnits();
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
        onRow={(rowData) => ({
          onClick: () => {
            setCurrentUnit(rowData);
          },
        })}
      />

      <NewUnitForm
        title="Tạo đơn vị quản lý mới"
        width="934px"
        visible={createModalVisible}
        onVisibleChange={handleCreateModalVisible}
        onFinish={async (value) => {
          await handleAddNewUnit(value as API.CreateManagementUnitRequest);
        }}
      />

      {currentUnit?.name && (
        <UnitDetailDrawer
          showDetail={showDetail}
          setShowDetail={setShowDetail}
          currentUnit={currentUnit || {}}
        />
      )}
    </PageContainer>
  );
};

export default TableCustom;
