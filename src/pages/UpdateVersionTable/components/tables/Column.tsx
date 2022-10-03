import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties//TableCell';
import { formatDate } from '@/utils';
import DateFilter from '@/components/TableProperties/DateFilter';
import type { Dispatch, SetStateAction } from 'react';
import { useMemo } from 'react';
import { FormattedMessage, useRequest } from 'umi';
import FilterComponent from '@/components/TableProperties/FilterComponent';
import api from '@/services/STM-APIs';
import { Typography } from 'antd';

type ColumnProps = {
  setCurrentRow: (s: API.VersionResponse) => void;
  setShowDetail: (s: boolean) => void;
  setParamFilter: Dispatch<SetStateAction<API.getAllVersionParams | undefined>>;
  paramFilter: API.getAllVersionParams | undefined;
};
//------------ Filter type --------------------------------

type filterType = {
  id: number;
  text: string;
  value: string;
}[];
const filterTypeMachineList: filterType = [
  {
    id: 1,
    text: 'ATM',
    value: 'ATM',
  },
  {
    id: 2,
    text: 'CDM',
    value: 'CDM',
  },
  {
    id: 3,
    text: 'STM',
    value: 'STM',
  },
];

function Column({ setCurrentRow, setShowDetail, setParamFilter, paramFilter }: ColumnProps) {
  const { data: listMachine } = useRequest<API.ResponseBasePageResponseStmModelResponse>(
    () => {
      const params: API.getListModelsParams = {
        machineType: paramFilter?.machineType,
        pageSize: 1000,
      };
      return api.STMModelController.getListModels(params);
    },
    {
      refreshDeps: [paramFilter?.machineType],
    },
  );
  const modelFilter: filterType = useMemo(() => {
    return listMachine?.items
      ? listMachine?.items?.map((item, index) => {
          return {
            id: index,
            text: item.name as string,
            value: `${item.id}`,
          };
        })
      : [];
  }, [listMachine]);
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
      filterDropdown: (e) => {
        return (
          <FilterComponent
            listFilter={filterTypeMachineList}
            {...e}
            setParamFilter={(value) => {
              setParamFilter({
                ...paramFilter,
                machineType: value as 'UNKNOWN' | 'ATM' | 'CDM' | 'STM' | undefined,
              });
            }}
          />
        );
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
      filterDropdown: (e) => {
        return (
          <FilterComponent
            listFilter={modelFilter}
            {...e}
            setParamFilter={(value) => {
              setParamFilter({
                ...paramFilter,
                modelId: value ? Number(value) : undefined,
              });
            }}
          />
        );
      },
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
      filterDropdown: (e) => {
        return (
          <DateFilter
            setDateFilter={(from: string | undefined, to: string | undefined) => {
              setParamFilter({
                ...paramFilter,
                from: from,
                to: to,
              });
            }}
            {...e}
          />
        );
      },
      width: '180px',
    },
  ];
  return columns;
}

export default Column;
