import type { ProColumns } from '@ant-design/pro-components';
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
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [currentRow, setCurrentRow] = useState<API.ManagementUnitResponse>();

  // const [totalPage, setTotalPage] = useState<number>(1);

  //-------------- Pagination props --------------------------------
  const paginationLocale = {
    items_per_page: '',
    jump_to: 'Trang',
    page: '',
  };

  //------------ pagination --------------------
  const pageSizeRef = useRef<number>(2);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [paramFilter, setParamFilter] = useState<API.getAllManagementUnitsParams | undefined>();

  const columns: ProColumns<API.ManagementUnitResponse>[] = Column({
    setCurrentRow,
    setShowDetail,
    setParamFilter,
    paramFilter,
  });

  const { run: runGetAllManagementUnits, data: listUnit } =
    useRequest<API.ResponseBasePageResponseManagementUnitResponse>(
      () => {
        const params: API.getAllManagementUnitsParams = {
          ...paramFilter,
          pageNumber: page - 1,
          pageSize: pageSizeRef.current,
        };
        return getAllManagementUnits(params);
      },
      {
        onSuccess(res) {
          setTotalSize(res?.totalSize as number);
        },
        onError(error) {
          console.log('error', error);
        },
        refreshDeps: [paramFilter, page],
      },
    );

  const handleAddNewUnit = async (record: API.CreateManagementUnitRequest) => {
    const hide = message.loading('Loading...');

    try {
      const res = await createManagementUnit({ ...record });
      hide();
      if (res.code === 700) {
        message.error(`${record.name} ${record.code} ${record.address} đã được sử dụng`);
        return;
      }
      message.success('Thêm đơn vị mới thành công');
      handleCreateModalVisible(false);
      runGetAllManagementUnits();
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
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <AddNew
            key="primary"
            enableCreateNew={true}
            onClick={() => {
              handleCreateModalVisible(true);
            }}
          />,
        ]}
        dataSource={listUnit?.items}
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
        <NewUnitForm
          title="Tạo đơn vị quản lý mới"
          width="934px"
          visible={createModalVisible}
          onVisibleChange={handleCreateModalVisible}
          onFinish={async (value) => {
            await handleAddNewUnit(value as API.CreateManagementUnitRequest);
          }}
        />
      )}

      {showDetail && (
        <UnitDetailDrawer
          showDetail={showDetail}
          setShowDetail={setShowDetail}
          currentUnit={currentRow || {}}
          setCurrentUnit={setCurrentRow}
          runGetAllManagementUnits={() => {
            runGetAllManagementUnits();
          }}
        />
      )}
    </PageContainer>
  );
};

export default TableCustom;
