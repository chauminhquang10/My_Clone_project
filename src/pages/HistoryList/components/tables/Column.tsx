import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties/TableCell';
import { Tooltip } from 'antd';
import { FormattedMessage } from 'umi';
import { formatDate, formatStaffName } from '@/utils';

type ColumnProps = {
  paramFilter: API.getListMachinesParams | undefined;
  setParamFilter: React.Dispatch<React.SetStateAction<API.getListMachinesParams | undefined>>;
};

function Column({}: ColumnProps) {
  const columns: ProColumns<API.SystemOperationResponse>[] = [
    {
      title: 'Id',
      key: 'id',
      dataIndex: 'id',
      hideInTable: true,
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="historyList.tables.headCell.title.action" />
        </HeadCell>
      ),
      key: 'action',
      width: '20%',
      dataIndex: 'action',
      render: (dom) => {
        return (
          <TextCell>{dom && <FormattedMessage id={`historyList.tables.action.${dom}`} />}</TextCell>
        );
      },
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="historyList.tables.headCell.title.createdBy" />
        </HeadCell>
      ),
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: '20%',
      render: (_, entity) => {
        return (
          <TextCell>{formatStaffName(entity.createdBy?.staffId, entity.createdBy?.name)}</TextCell>
        );
      },
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="historyList.tables.headCell.title.module" />
        </HeadCell>
      ),
      key: 'module',
      dataIndex: 'module',
      render: (dom) => {
        return (
          <TextCell>{dom && <FormattedMessage id={`historyList.tables.module.${dom}`} />}</TextCell>
        );
      },
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="historyList.tables.headCell.title.time" />
        </HeadCell>
      ),
      dataIndex: 'time',
      key: 'time',
      render: (dom) => {
        return <TextCell>{formatDate(dom as string)}</TextCell>;
      },
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="historyList.tables.headCell.title.content" />
        </HeadCell>
      ),
      dataIndex: 'content',
      key: 'content',
      render: (dom) => {
        return (
          <Tooltip placement="bottom" title={dom}>
            <div>
              <TextCell>{dom}</TextCell>
            </div>
          </Tooltip>
        );
      },
    },
  ];
  return columns;
}

export default Column;
