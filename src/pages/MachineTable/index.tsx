// import { addRule } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
// import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useRequest } from 'umi';
import AddNew from '@/components/TableProperties/AddNew';
import Column from './components/tables/Column';
// import SelectPage from "./components/tables/SelectPage";
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import AddNewMachine from './components/forms/AddNewMachine';
import MachineDrawer from './MachineDrawer';
import api from '@/services/STM-APIs';
import { openNotification } from '@/utils';

const TableCustom = () => {
  //----------- get all machine ---------------------
  const [listMachine, setListMachine] = useState<API.StmInfoResponse[]>();
  const { run: runGetAllMachine } = useRequest(
    (params: API.getListMachinesParams) => api.STMController.getListMachines(params),
    {
      manual: true,
      onSuccess: (res) => {
        if (!res) {
          openNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau');
        }
        setListMachine(res?.items);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  useEffect(() => {
    runGetAllMachine();
  }, []);

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.StmInfoResponse>();

  const columns: ProColumns<API.StmInfoResponse>[] = Column({
    setCurrentRow,
    setShowDetail,
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = useRef<number>(20);

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
        headerTitle={<TitleTable>Danh sách máy</TitleTable>}
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
        dataSource={listMachine}
        columns={columns}
        options={false}
        scroll={{ x: 'max-content' }}
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

      <MachineDrawer
        open={showDetail}
        handleClose={() => setShowDetail(false)}
        currentEntity={currentRow}
      />
      <AddNewMachine handleModalVisible={handleModalVisible} visible={createModalVisible} />
    </PageContainer>
  );
};

export default TableCustom;
