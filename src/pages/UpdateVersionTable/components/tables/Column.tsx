import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties//TableCell';
import { formatDate } from '@/utils';
import DateFilter from '@/components/TableProperties/DateFilter';
import type { Dispatch, SetStateAction } from 'react';
import { FormattedMessage } from 'umi';
import { Typography } from 'antd';

type ColumnProps = {
  setCurrentRow: (s: API.VersionResponse) => void;
  setShowDetail: (s: boolean) => void;
  setParamFilter: Dispatch<SetStateAction<API.getAllVersionParams | undefined>>;
  paramFilter: API.getAllVersionParams | undefined;
};
//------------ Filter type --------------------------------

type filterType = {
  text: string;
  value: string;
};

//------------ Filter moodel --------------------------------

const filterModelList: filterType[] = [
  {
    text: '',
    value: '',
  },
];

const filterModel = (value: string | number | boolean, record: API.VersionResponse) => {
  return record.name?.includes(value as string) as boolean;
};

function Column({ setCurrentRow, setShowDetail }: ColumnProps) {
  const columns: ProColumns<API.VersionResponse>[] = [
    {
      title: (
        <HeadCell>
          <FormattedMessage id="updateVersionTable.versionName" />
        </HeadCell>
      ),
      dataIndex: 'name',
      render: (dom, entity) => {
        const stt = dom as number;
        return (
          <TextCell
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
            width="240px"
          >
            {stt}
          </TextCell>
        );
      },
      sorter: (a, b) => {
        if (a.name && b.name) return a.name.localeCompare(b.name);
        else return 1;
      },
      width: '240px',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="machineType" />
        </HeadCell>
      ),
      dataIndex: 'machineType',
      render: (dom) => {
        return <TextCell width="140px">{dom}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.machineType && b.machineType) return a.machineType.localeCompare(b.machineType);
        else return 1;
      },
      width: '140px',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="model" />
        </HeadCell>
      ),
      dataIndex: 'model',
      render: (_, entity) => {
        return <TextCell>{entity.model?.name}</TextCell>;
      },
      filters: filterModelList,
      onFilter: filterModel,
      width: '240px',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="updateVersionTable.description" />
        </HeadCell>
      ),
      dataIndex: 'content',
      render: (dom) => {
        return (
          <TextCell width="580px">
            <Typography.Text ellipsis={{ tooltip: dom }}>{dom}</Typography.Text>
          </TextCell>
        );
      },
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="updateVersionTable.updateCondition" />
        </HeadCell>
      ),
      dataIndex: 'condition',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      width: '180px',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="updateVersionTable.date" />
        </HeadCell>
      ),
      dataIndex: 'createdAt',
      render: (dom) => {
        return <TextCell>{formatDate(dom as string)}</TextCell>;
      },
      filterDropdown: () => {
        return <DateFilter />;
      },
      width: '180px',
    },
  ];
  return columns;
}

export default Column;
