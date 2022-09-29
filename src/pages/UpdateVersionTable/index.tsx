import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import api from '@/services/STM-APIs';
import { useRef, useState } from 'react';
// import { FormattedMessage } from 'umi';
import { useIntl, useModel, useRequest } from 'umi';
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

const TableCustom = () => {
  const [paramFilter, setParamFilter] = useState<API.getAllVersionParams | undefined>();
  //------------ pagination --------------------
  const pageSizeRef = useRef<number>(20);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  //---------------  handle getAllUser -------------------------------

  const { data: listUpdateVersion, run: getAllUpdatedVersion } = useRequest(
    () => {
      const params: API.getAllVersionParams = {
        ...paramFilter,
        pageNumber: page - 1,
        pageSize: pageSizeRef.current,
      };
      return api.STMVersionController.getAllVersion(params);
    },
    {
      onSuccess: (res) => {
        if (!res) openNotification('error', 'Có lỗi xảy ra');
        setTotalSize(res?.totalSize as number);
        return res;
      },
      onError: (error) => {
        console.log(error);
      },
      refreshDeps: [paramFilter],
    },
  );

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [currentRow, setCurrentRow] = useState<API.VersionResponse>();

  console.log(showDetail, currentRow);

  //------------ handle create new  --------------------
  const handleAddNewVersion = async (record: API.CreateVersionRequest, file: File) => {
    const hide = message.loading('Loading...');

    try {
      const res = await api.STMVersionController.uploadNewVersion({ ...record }, file);
      hide();
      if (res.code === 504) {
        message.error(`${record.name} ${record.modelId}  đã được sử dụng`);
        return false;
      }
      message.success('Thêm version mới thành công');
      handleModalVisible(false);
      getAllUpdatedVersion();
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };
  //------------ pagination --------------------
  const columns: ProColumns<API.VersionResponse>[] = Column({
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
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  console.log('listUpdateVersion: ', listUpdateVersion);
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
          <TitleTable>{intl.formatMessage({ id: 'updateVersionTable.title' })}</TitleTable>
        }
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <AddNew
            key="primary"
            enableCreateNew={initialState?.currentRoles?.create_version || false}
            onClick={() => {
              handleModalVisible(true);
            }}
            text="Upload"
            icon={<UploadOutlined style={{ color: 'white' }} />}
          />,
        ]}
        dataSource={listUpdateVersion?.items}
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
        scroll={{ x: 'max-content' }}
      />
      <NewVersionForm
        title="Upload phiên bản mới"
        width="934px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value, avatar) => {
          return await handleAddNewVersion(value as API.CreateVersionRequest, avatar);
        }}
      />
      <VersionDetailDrawer
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        getAllUpdatedVersion={getAllUpdatedVersion}
      />
    </PageContainer>
  );
};

export default TableCustom;
