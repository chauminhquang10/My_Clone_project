import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import api from '@/services/STM-APIs';
import { useRef, useState } from 'react';
// import { FormattedMessage } from 'umi';
import { useRequest } from 'umi';
// import NewUserForm from './components/forms/NewUserForm';
import AddNew from '@/components/TableProperties/AddNew';
import Column from './components/tables/Column';
import style from '@/components/TableProperties/style.less';
import TitleTable from '@/components/TableProperties/TitleTable';
import TotalPagination from '@/components/TableProperties/TotalPagination';
import { openNotification } from '@/utils';
import { UploadOutlined } from '@ant-design/icons';
import NewVersionForm from './components/forms/NewVersionForm';
import { message } from 'antd';
import VersionDetailDrawer from './components/forms/VersionDetailDrawer';

// const handleAdd = async (fields: API.VersionResponse) => {
//   const hide = message.loading('正在添加');
//   try {
//     // await addRule({ ...fields });
//     console.log(fields);
//     hide();
//     message.success('Added successfully');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Adding failed, please try again!');
//     return false;
//   }
// };

const TableCustom = () => {
  //---------------  handle getAllUser -------------------------------

  const { run: runGetAllUpdateVersion } = useRequest(
    (params: API.getAllVersionParams) => api.STMVersionController.getAllVersion(params),
    {
      manual: true,
      onSuccess: (res) => {
        if (!res) openNotification('error', 'Có lỗi xảy ra');
        return res?.items;
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
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  // const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.VersionResponse>();

  console.log(showDetail, currentRow);

  //------------ handle create new  --------------------
  const handleAddNewVersion = async (record: API.CreateVersionRequest, file: File) => {
    const hide = message.loading('Loading...');

    try {
      const res = await api.STMVersionController.uploadNewVersion({ ...record }, file);
      hide();
      if (res.code === 700) {
        message.error(`${record.name} ${record.modelId}  đã được sử dụng`);
        return;
      }
      message.success('Thêm version mới thành công');
      handleModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
    }
  };
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  //------------ pagination --------------------
  // const [totalSize, setTotalSize] = useState<number>(0);
  // const [page, setPage] = useState<number>(1);
  const pageSize = useRef<number>(20);
  const columns: ProColumns<API.VersionResponse>[] = Column({
    setCurrentRow,
    setShowDetail,
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
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
        headerTitle={<TitleTable>Danh sách phiên bản hệ thống</TitleTable>}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <AddNew
            key="primary"
            enableCreateNew={true}
            onClick={() => {
              handleModalVisible(true);
            }}
            text="Upload"
            icon={<UploadOutlined style={{ color: 'white' }} />}
          />,
        ]}
        request={async (params = {}) => {
          console.log(params);

          const pageRequestParams: API.getAllVersionParams = {
            // pageNumber: params.current,
            // pageSize: params.pageSize,
            // sortDirection: '',
            // sortBy: '',
          };
          const res = await runGetAllUpdateVersion({
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
      <NewVersionForm
        title="Upload phiên bản mới"
        width="934px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value, avatar) => {
          await handleAddNewVersion(value as API.CreateVersionRequest, avatar);
        }}
      />
      <VersionDetailDrawer
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        actionRef={actionRef}
      />
    </PageContainer>
  );
};

export default TableCustom;
