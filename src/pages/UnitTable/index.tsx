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
import { useIntl } from 'umi';

const TableCustom = () => {
  const intl = useIntl();

  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ManagementUnitResponse>();

  const columns: ProColumns<API.ManagementUnitResponse>[] = Column({
    setCurrentRow,
    setShowDetail,
  });

  const pageSize = useRef<number>(10);
  // const [totalPage, setTotalPage] = useState<number>(1);

  //-------------- Pagination props --------------------------------
  const paginationLocale = {
    items_per_page: '',
    jump_to: 'Trang',
    page: '',
  };

  //------------ pagination --------------------
  const pageSizeRef = useRef<number>(20);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const { run: runGetAllManagementUnits } =
    useRequest<API.ResponseBasePageResponseManagementUnitResponse>(
      (params: API.getAllManagementUnitsParams) => getAllManagementUnits(params),
      {
        onSuccess() {},
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
      const res = await createManagementUnit({ ...record });
      hide();
      if (res.code === 700) {
        message.error(`${record.name} ${record.code} ${record.address} đã được sử dụng`);
        return;
      }

      message.success(
        intl.formatMessage({
          id: 'createUnit_successStatus_message',
        }),
      );
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
        headerTitle={
          <TitleTable>
            {intl.formatMessage({
              id: 'managementUnit_tableTitle',
            })}
          </TitleTable>
        }
        actionRef={actionRef}
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
        request={async () => {
          const params: API.getAllManagementUnitsParams = {
            pageNumber: page - 1,
            pageSize: pageSizeRef.current,
          };

          const res = await runGetAllManagementUnits(params);
          setTotalSize(res?.totalSize as number);
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
            setPage(current);
          },
          total: totalSize,
          current: page,
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
        <NewUnitForm
          title={intl.formatMessage({
            id: 'createForm_title',
          })}
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
          detailActionRef={actionRef}
        />
      )}
    </PageContainer>
  );
};

export default TableCustom;
