// import { addRule } from '@/services/ant-design-pro/api';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
// import { message } from 'antd';
import AddNew from '@/components/TableProperties/AddNew';
import { useRef, useState } from 'react';
import { FormattedMessage, useIntl, useRequest } from 'umi';
import Column from './components/tables/Column';
// import SelectPage from "./components/tables/SelectPage";
import style from '@/components/TableProperties/style.less';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import api from '@/services/STM-APIs';
import { Typography } from 'antd';
import AddNewMachine from './components/forms/AddNewMachine';
import MachineDrawer from './MachineDrawer';

const TableCustom = () => {
  const intl = useIntl();
  //------------ pagination --------------------
  const pageSizeRef = useRef<number>(2);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [currentRow, setCurrentRow] = useState<API.StmInfoResponse>();

  const [paramFilter, setParamFilter] = useState<API.getListMachinesParams | undefined>();

  const { data: listMachine, run: getAllMachine } =
    useRequest<API.ResponseBasePageResponseStmInfoResponse>(
      () => {
        const params: API.getListMachinesParams = {
          pageNumber: page - 1,
          pageSize: pageSizeRef.current,
          location: paramFilter?.location,
          provinceId: paramFilter?.provinceId,
          machineType: paramFilter?.machineType,
          status: paramFilter?.status,
        };
        return api.STMController.getListMachines(params);
      },
      {
        onSuccess: (res) => {
          setTotalSize(res?.totalSize as number);
        },
        refreshDeps: [paramFilter, page],
      },
    );

  const columns: ProColumns<API.StmInfoResponse>[] = Column({
    setCurrentRow,
    setShowDetail,
    setParamFilter,
    paramFilter,
  });

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
        headerTitle={
          <Typography.Title level={4} style={{ margin: 0 }}>
            <FormattedMessage id="machine-table.title" />
          </Typography.Title>
        }
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <AddNew
            enableCreateNew={true}
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          />,
        ]}
        columns={columns}
        options={false}
        scroll={{ x: 'max-content' }}
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
        dataSource={listMachine?.items?.map((item) => ({
          ...item,
          location: intl.formatMessage({ defaultMessage: item.location, id: item.location }),
        }))}
      />

      <MachineDrawer
        open={showDetail}
        handleClose={() => setShowDetail(false)}
        currentEntity={currentRow}
        getAllMachine={() => {
          getAllMachine();
        }}
      />
      <AddNewMachine
        handleModalVisible={handleModalVisible}
        visible={createModalVisible}
        getAllMachine={() => getAllMachine()}
      />
    </PageContainer>
  );
};

export default TableCustom;
